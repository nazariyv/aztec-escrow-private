pragma solidity >=0.5.0 <0.7.0;

import "@aztec/protocol/contracts/libs/NoteUtils.sol";
import "@aztec/protocol/contracts/ACE/ACE.sol";
import "@aztec/protocol/contracts/interfaces/IZkAsset.sol";

library EscrowUtils {
    using NoteUtils for bytes;

    uint24 constant JOIN_SPLIT_PROOF = 65793;

    struct Note {
        address owner;
        bytes32 noteHash;
    }

    struct LoanVariables {
        uint256 interestRate;
        uint256 interestPeriod;
        uint256 duration;
        uint256 loanSettlementDate;
        uint256 lastInterestPaymentDate;
        bytes32 notional;
        bytes32 currentInterestBalance;
        address borrower;
        address lender;
        address loanFactory;
        address aceAddress;
        IZkAsset settlementToken;
        address id;
    }

    function noteBytesToStruct(bytes memory note)
        internal
        pure
        returns (Note memory codedNote)
    {
        (address owner, bytes32 noteHash, ) = note.extractNote();
        return Note(owner, noteHash);
    }

    function confidentialTransfer(
        bytes calldata proofData,
        LoanVariables storage _loanVariables
    ) external returns (bool success) {
        bytes memory proofOutputs = ACE(_loanVariables.aceAddress)
            .validateProof(JOIN_SPLIT_PROOF, address(this), proofData);
        (bytes memory proofInputNotes, bytes memory proofOutputNotes, , ) = proofOutputs
            .get(0)
            .extractProofOutput();

        require(
            noteBytesToStruct(proofInputNotes.get(0)).noteHash ==
                _loanVariables.currentInterestBalance,
            "interest note does not match input note"
        );
        require(
            noteBytesToStruct(proofOutputNotes.get(1)).owner == address(this),
            "output note not owned by contract"
        );

        _loanVariables.settlementToken.confidentialApprove(
            noteBytesToStruct(proofInputNotes.get(0)).noteHash,
            address(this),
            true,
            ""
        );
        _loanVariables.settlementToken.confidentialTransferFrom(
            JOIN_SPLIT_PROOF,
            proofOutputs.get(0)
        );
        // newCurrentInterestBalance = _noteCoderToStruct(proofOutputNotes.get(1))
        //     .noteHash;
        return true;
    }
}
