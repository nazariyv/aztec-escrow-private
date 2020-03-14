pragma solidity >=0.5.0 <0.7.0;

import "./EscrowUtils.sol";

contract PrivateEscrow {
    address owner;
    mapping(bytes32 => Escrow) private escrows;

    struct Escrow {
        bool exists;
        bool senderApproved;
        bool receiverApproved;
    }

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "action not allowed");
        _;
    }

    modifier onlyEscrowParties(
        address payable sender,
        address payable receiver
    ) {
        require(msg.sender == sender || msg.sender == receiver, "not allowed");
        _;
    }

    function getEscrow(
        bytes16 escrowID,
        address payable sender,
        address payable receiver
    )
        private
        view
        returns (
            // uint16 fee
            Escrow memory
        )
    {
        bytes32 tradeHash = getEscrowHash(escrowID, sender, receiver);
        return escrows[tradeHash];
    }

    function getEscrowHash(
        bytes16 escrowID,
        address payable sender,
        address payable receiver
    )
        private
        pure
        returns (
            // uint16 fee
            bytes32 hash
        )
    {
        bytes32 tradeHash = keccak256(
            abi.encodePacked(escrowID, sender, receiver)
        );
        return tradeHash;
    }

    function escrowExists(
        /**
        * Used to verify that the escrow exists. Proof-of-funds.
        */
        bytes16 escrowID,
        address payable sender,
        address payable receiver
    )
        public
        view
        returns (
            // uint16 fee // how much we earn off the trasnsaction
            bool
        )
    {
        bytes32 tradeHash = getEscrowHash(escrowID, sender, receiver);
        return escrows[tradeHash].exists;
    }

    function createEscrow(
        bytes16 escrowID,
        address payable receiver,
        uint256 value
    ) external payable {
        address payable sender = msg.sender;
        bytes32 tradeHash = getEscrowHash(escrowID, sender, receiver);
        require(!escrows[tradeHash].exists, "could not find escrow");
        require(msg.value == value && msg.value > 0, "incorrect value");
        escrows[tradeHash] = Escrow(true, false, false);
    }

    function approve(
        bytes16 escrowID,
        address payable sender,
        address payable receiver
    ) external onlyEscrowParties(sender, receiver) {
        bytes32 tradeHash = getEscrowHash(escrowID, sender, receiver);
        require(escrows[tradeHash].exists, "escrow not found");
        if (msg.sender == sender) {
            require(
                !escrows[tradeHash].senderApproved,
                "already approved by you"
            );
            escrows[tradeHash].senderApproved = true;
        } else {
            require(
                !escrows[tradeHash].receiverApproved,
                "already approved by you"
            );
            escrows[tradeHash].receiverApproved = true;
        }
    }

    // function release(
    //     bytes16 escrowID,
    //     address payable sender,
    //     address payable receiver,
    //     uint256 value
    // ) external payable onlyEscrowParties(sender, receiver) returns (bool) {
    //     bytes32 tradeHash = getEscrowHash(escrowID, sender, receiver);
    //     require(escrows[tradeHash].exists, "escrow not found");
    //     require(
    //         escrows[tradeHash].senderApproved &&
    //             escrows[tradeHash].receiverApproved,
    //         "not approved"
    //     );
    //     delete escrows[tradeHash];
    //     receiver.transfer(value);
    //     return true;
    // }

    function releaseEscrow(
        bytes calldata proof2,
        bytes calldata proof1OutputNotes,
        LoanVariables storage _loanVariables
    ) external {
        bytes memory proof2Outputs = ACE(_loanVariables.aceAddress)
            .validateProof(JOIN_SPLIT_PROOF, address(this), proof2);

        (bytes memory proof2InputNotes, bytes memory proof2OutputNotes, , ) = proof2Outputs
            .get(0)
            .extractProofOutput();

        // require(_noteCoderToStruct(_proof2InputNotes.get(1)).noteHash ==
        //         _noteCoderToStruct(_proof1OutputNotes.get(0)).noteHash, 'withdraw note in 2 is not the same as  1');
        // require(_noteCoderToStruct(_proof2InputNotes.get(0)).noteHash == _loanVariables.notional, 'notional in 2 is not the same as 1');

        require(
            EscrowUtils.noteBytesToStruct(proof2OutputNotes.get(0)).owner ==
                _loanVariables.lender,
            "output note is not owned by the lender"
        );
        require(
            EscrowUtils.noteBytesToStruct(proof2OutputNotes.get(1)).owner ==
                _loanVariables.lender,
            "output note is not owned by the lender"
        );

        _loanVariables.settlementToken.confidentialApprove(
            _noteCoderToStruct(proof2InputNotes.get(0)).noteHash,
            address(this),
            true,
            ""
        );
        // the first note is the current interest note

        _loanVariables.settlementToken.confidentialTransferFrom(
            JOIN_SPLIT_PROOF,
            proof2Outputs.get(0)
        );

    }
}
