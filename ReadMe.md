# TraceLabs hiring task
The smart contract has been written for the request of TraceLabs company.

Author: Dr. Berat Çelik

Date: 20/09/2021

#How to run the code

###Deploy ERC-20 Token Contract Locally

With our smart contract created and setup done, now's the fun part. 
Let's deploy! We will first use Truffle to compile and deploy the token 
contract to a locally running ethereum network.

start a Ganache from terminal with the secret key

`ganache-cli -m "opera uncle resist garage appear very when settle please front local lawn"`

Open a new tab and run

``truffle test``

You will see test cases running and 12 passing test.

###Deploy Token Contract on Rinkeby
Get Tokens from Public Faucet

Before we can deploy our contract on Rinkeby, we need to make sure have enough ethers.
To get our ethers in the test network, we will get some ether from a public faucet.
We will walk-through how to deploy our contract on Rinkeby.

To request ethers,

https://faucet.rinkeby.io/

https://www.youtube.com/watch?v=xY6ag7a9xuQ

###Deploy Contract and Send Tokens

Now that we have enough ethers our Rinkeby account, let's deploy our token contract to the Rinkeby network! Once deployed, we can use the contract to find our contract on Etherscan. Finally, we will wrap it up by using Metamask to transfer the tokens we created between Ethereum accounts!

`truffle migrate --reset --network rinkeby`

or using Ganache 

`ganache-cli -m "opera uncle resist garage appear very when settle please front local lawn"`

Be sure that MetaMask is using the same seed.

##Frontend
  
Go to ./app

``npm run dev``
