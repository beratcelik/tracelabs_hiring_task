var BigNumber = require('bignumber.js');

const sampleToken = artifacts.require("XYZ");
const name = "XYZ";
const symbol = "xyz";
const powered = 18+9;
const initialSupply = new BigNumber ( Math.pow(10, powered) );

module.exports = function (deployer) {
    deployer.deploy(sampleToken, name, symbol, initialSupply);
};