# What is an escrow?

Escrow is a financial arrangement where a third party holds and regulates payment
of the funds required for two parties involved in a given transaction

# How do we make escrows private on Ethereum?

All the transactions on Ethereum are publicly visible. If you want a private escrow service then this little app gives you the bare-bones of what is required to implement it. You can find the source code [here](https://github.com/nazariyv/aztec-escrow-private). Privacy is achieved by using the [Aztec protocol](https://www.aztecprotocol.com/). Which in turn uses [zero knowledge proofs](https://ethresear.ch/t/zero-knowledge-proofs-starter-pack/4519) to give us the ability to enquire about different pieces of information about the amounts, without actually knowing values.

At the core of Aztec protocol are [notes](https://medium.com/aztec-protocol/an-introduction-to-aztec-47c70e875dc7). These allow you to transact confidentially. This app is implemented on Rinkeby ethereum test network, so you will need to switch your MetaMask to Rinkeby. See the section below to set everything up.

# Start here

To test this app out, we need some private tokens, here is how to get them

## 1. Obtain Rinkeby ERC20 tokens

To obtain some ERC20 tokens on Rinkeby, you can go [here](https://docs.aztecprotocol.com/#/SDK/zkAsset/Introduction) (this is Aztec developer's documentation), click `Setup AZTEC`
and `zkAssetAddress` variable should change to `0x54Fac13e652702a733464bbcB0Fb403F1c057E1b`

![aztec get erc20 image 1](aztec-erc20-get-1)

If it doesn't, copy and paste this address into that console (you can write code inside of it). This is an address of an ERC20 token on Rinkeby, for convenience, we shall call it DAI from now on. Now, you are able to request some DAI for yourself, click on `Get ERC20 tokens`

![aztec get erc20 image 2](aztec-erc20-get-2)

If everything went smoothly, you should get an Etherscan transaction hash, as you can see, I now have 350 DAI

![aztec get erc20 image 3](aztec-erc20-get-3)

After this step, the balances on the main page should update (you will need to refresh the page).

## 2. Obtain zero knowledge tokens

In this step, we use the DAI token above to convert it into aztec notes, or zkDAI. When we transact with zkDAI, noone will be able to reveal the amounts, unless we give the view permissions to our notes.

Go [here](https://docs.aztecprotocol.com/#/SDK/zkAsset/.deposit) and scroll down to the code snippet, input your ethereum and `zkAssetAddress` and then click `Run Code`

![aztec get zkdai image 1](aztec-zkdai-get-1)

this will take the DAI and convert it into zkDAI, the notes that you will be able to confidentially transact with.

It is important to note that the process of taking DAI and converting it into zkDAI is **public**, anyone can go to a blockchain explorer and see this

![aztec get zkdai image 2](aztec-zkdai-get-2)

which clearly shows that I have sent 50 DAI to a smart contract that then converts it into zk dai. This means that the more people use the zk asset, the more private it will become

# How this app works?

We first assume that we have a private asset in our possession. We then send the private asset to a smart contract that acts as an escrow third party. For simple proofs, like join-split proof, we can use Aztec's `.send()` directly, which creates the notes for us under the hood. According to [this](https://medium.com/aztec-protocol/why-hashes-dominate-in-snarks-b20a555f074c) and [this](https://docs.aztecprotocol.com/#/SDK/note/Introduction) we can use the note hash as a unique identifier of a transaction directly (this sentence should go into the Medium blog post).

We are able to specify the number of output notes to be created with `.send()`. The more notes you create, the harder it will be to infer the actual amounts of the notes. You are also able to give the viewing permissions to the created notes to other addresses. We shall use this feature, to provide the "proof of funds" for the party that shall receive the escrow. For simplicity, we create a single output note in the `Create Escrow` window. If multiple notes are created, a hash of their hashed can be used as a unique identifier of an escrow.

# How You can contribute

1. We can move all the Aztec faucets to this website, in case their docs change in the future
2. We are not updating the accounts / network when we switch them with MetaMask
3. validation of inputs and warning / error messages when something goes wrong
4. Explain the workflow better so that anyone can understand it easily
5. shows how many approves needed to release the funds
6. automatic release after enough approves (the last step is unnecessary)
7. headerNavigation's grey line is awwwful
8. move this app to mainnet
9. add more tokens
10. add fees to be collected by the escrow smart contract
11. create react context to share the state of the App
12. ability to have caption and error at the same time with FormControl components
13. use baseui's constants for fontsizes, paddings, etc.
