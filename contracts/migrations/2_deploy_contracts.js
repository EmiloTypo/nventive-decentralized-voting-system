var VotingContract = artifacts.require("../contracts/voting.sol");
module.exports = function (deployer) {
  deployer.deploy(VotingContract);
};
