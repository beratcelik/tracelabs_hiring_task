var BigNumber = require('bignumber.js');

const sampleToken = artifacts.require("XYZ");
const name = "XYZ";
const symbol = "xyz";
const powered = 18+9;
const initialSupply = new BigNumber ( Math.pow(10, powered) );

contract('Testing XYZ Token', accounts => {

    const contractOwner = accounts[0];
    const contractUser1 = accounts[1];
    const contractUser2 = accounts[2];
    const contractUser3 = accounts[3];

    const bank = accounts[7];

    const transferAmount = new BigNumber ( initialSupply/2 );

    describe('Coin Testing', function () {
        beforeEach(async function f() {
            this.contract = await sampleToken.new(name, symbol, initialSupply, {from:contractOwner});
        });

        it('Get the name of the token', async function () {
            await this.contract.name().then(function (res) {
                assert.equal(res, name,'The name of the contract is not correct.');
            });
        });

        it('Get the symbol of the token', async function () {
            await this.contract.symbol().then(function (res) {
                assert.equal(res, symbol,'The symbol of the contract is not correct.');
            });
        });

        it('Get the decimals of the token', async function () {
            await this.contract.decimals().then(function (res) {
                assert.equal(res, 18,'The decimals of the contract is not 18.');
            });
        });

        it('Get the total supply of the token', async function () {
            await this.contract.totalSupply().then(function (res) {
               console.log("Total Supply: " + Number(res));
               console.log("Initial Supply: " + Number(initialSupply));
            });
        });

        it('Get the balance of contract owner', async function () {
            await this.contract.balanceOf(contractOwner).then(function (res) {
                console.log("The balance of contract owner: " + Number(res));
            });
        });

        it('Get the balance of contract user 1', async function () {
            await this.contract.balanceOf(contractUser1).then(function (res) {
                console.log("The balance of contract user 1: " + Number(res));
            });
        });

        it('Get the date of the contract creation', async function () {
            await this.contract.creationTime().then(function (res) {
                console.log("The contract is created at : " + res);
            });
        });

        it('Get the initial reward', async function () {
            await this.contract.reward().then(function (res) {
                console.log("The initial reward is : " + res);
            });
        });

        it('Get the initial R', async function () {
            await this.contract.R().then(function (res) {
                console.log("The initial R is : " + res);
            });
        });

        it('Get the initial T', async function () {
            await this.contract.T().then(function (res) {
                console.log("The initial T is : " + res);
            });
        });


    });

    describe('Transfer Coin testing', function () {
        beforeEach(async function f() {
            // runs before each test in this block
            this.contract = await sampleToken.new(name, symbol, initialSupply, {from:contractOwner});
        });

        it('Transfer `${transferAmount}` from contract owner to account 1', async function () {
                await this.contract.transfer(contractUser1, transferAmount, {from:contractOwner});
                let balanceContractOwner = await this.contract.balanceOf(contractOwner);
                let balanceContractUser1 = await this.contract.balanceOf(contractUser1);
                console.log("Contract Owners account: "+ Number(balanceContractOwner));
                console.log("Contract User1 account: "+ Number(balanceContractUser1));
                assert.equal(Number(balanceContractOwner),Number(balanceContractUser1), 'Transfer is not successfully');
        });
    });

    describe('Test Scenario', function () {
        beforeEach(async function f() {
            // runs before each test in this block
            let initialSupply1 = 1000;
            let initialSupply2 = 4000;
            this.contract = await sampleToken.new(name, symbol, initialSupply, {from:contractOwner});
            await this.contract.transfer(contractUser1, initialSupply1, {from:contractOwner});
            await this.contract.transfer(contractUser2, initialSupply2, {from:contractOwner});
            let balanceContractOwner = await this.contract.balanceOf(contractOwner);
            let balanceContractUser1 = await this.contract.balanceOf(contractUser1);
            let balanceContractUser2 = await this.contract.balanceOf(contractUser2);
            console.log("Initial Owners account: "+ Number(balanceContractOwner));
            console.log("Initial User1 account: "+ Number(balanceContractUser1));
            console.log("Initial User2 account: "+ Number(balanceContractUser2));
        });


        it('Users stake', async function () {
            console.log("---");
            await this.contract.transfer(contractOwner, 1000, {from:contractUser1});
            await this.contract.transfer(contractOwner, 4000, {from:contractUser2});

            let balanceContractUser1 = await this.contract.balanceOf(contractUser1);
            let balanceContractUser2 = await this.contract.balanceOf(contractUser2);
            let deposit1 = await this.contract.allowance(contractOwner, contractUser1, {from:contractOwner});
            let deposit2 = await this.contract.allowance(contractOwner, contractUser2, {from:contractOwner});
            let totalDeposit = await this.contract.totalDeposit( {from:contractOwner});
            let R = await this.contract.R( {from:contractOwner});


            console.log("User1 account: "+ Number(balanceContractUser1));
            console.log("User2 account: "+ Number(balanceContractUser2));
            console.log("Deposit of first user: "+deposit1 );
            console.log("Deposit of second user: "+deposit2 );
            console.log("Total deposit: "+totalDeposit );
            console.log("R: "+R );


            console.log("--- User 1 withdraws their tokens in period T2 - T3");
            await this.contract.transferFrom(contractOwner, contractUser1, deposit1, {from:contractUser1});
            deposit1 = await this.contract.allowance(contractOwner, contractUser1, {from:contractOwner});
            deposit2 = await this.contract.allowance(contractOwner, contractUser2, {from:contractOwner});
            totalDeposit = await this.contract.totalDeposit( {from:contractOwner});
            R = await this.contract.R( {from:contractOwner});
            balanceContractUser1 = await this.contract.balanceOf(contractUser1);
            balanceContractUser2 = await this.contract.balanceOf(contractUser2);

            console.log("User1 account: "+ Number(balanceContractUser1));
            console.log("User2 account: "+ Number(balanceContractUser2));
            console.log("Deposit of first user: "+deposit1 );
            console.log("Deposit of second user: "+deposit2 );
            console.log("Total deposit: "+totalDeposit );
            console.log("R: "+R );



        });


    });


});