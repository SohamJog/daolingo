
export const dataGovernanceTokenAddress = "0xE5592aBe3138de7F47cDbce042662C961d7949B4"
export const timeClockAddress = "0x4b376548e8EaB56ebB1932F76aEc17Edf6C4Fc38"
export const governorContractAddress = "0x893001108fc0dfb02B5caB21236e5752A22ED7f1"
export const daoDealClientAddress = "0xa69159D81E2AF9434a18C6a14Fc573e30489C22A"



export async function getTokenBalance(dataGovernanceToken, address) {
  
  const balance = await dataGovernanceToken.balanceOf(address)
  return balance
}

export async function vote(governor, voteWay, proposalId, reason) {
  console.log("Voting...")

  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);
  const voteTxReceipt = await voteTx.wait(1);
  console.log(voteTxReceipt.logs[0].args.reason);
  const proposalState = await governor.state(proposalId);
  console.log(`Current Proposal State: ${proposalState}`);
  
}

