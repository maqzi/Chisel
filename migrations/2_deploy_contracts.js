var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Chisel = artifacts.require("./Chisel.sol");

module.exports = async function(deployer) {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(Chisel);
};
