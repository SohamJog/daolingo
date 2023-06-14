
export const dataGovernanceTokenAddress = "0xE5592aBe3138de7F47cDbce042662C961d7949B4"
export const timeClockAddress = "0x4b376548e8EaB56ebB1932F76aEc17Edf6C4Fc38"
export const governorContractAddress = "0x893001108fc0dfb02B5caB21236e5752A22ED7f1"
export const daoDealClientAddress = "0xa69159D81E2AF9434a18C6a14Fc573e30489C22A"




export async function vote(governor, voteWay, proposalId, reason) {
  console.log("Voting...")

  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason);
  const voteTxReceipt = await voteTx.wait(1);
  console.log(voteTxReceipt.logs[0].args.reason);
  const proposalState = await governor.state(proposalId);
  console.log(`Current Proposal State: ${proposalState}`);
  
}

export async function queueAndExecute(daoDealClient, governor, DealRequestStruct) {
  const args = [DealRequestStruct]
  const functionToCall = "makeDealProposal"
  const encodedFunctionCall = daoDealClient.interface.encodeFunctionData(functionToCall, args)
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Let's put this file in Filecoin!"));
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  console.log("Queueing...")
  const queueTx = await governor.queue([daoDealClient.address], [0], [encodedFunctionCall], descriptionHash)
  await queueTx.wait(1)

  console.log("Executing...")
  // this will fail on a testnet because you need to wait for the MIN_DELAY!
  const executeTx = await governor.execute(
    [daoDealClient.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await executeTx.wait()
  console.log("Queued and Executed! ")


}
