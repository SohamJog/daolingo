const { ethers, network } = require("hardhat")
const {DealRequestStruct,
     PROPOSAL_DESCRIPTION,} = 
     require("../helper-hardhat-config")

async function queueAndExecute() {
  //TODO replace dealrequeststruct with the struct you made in the other react file
  const args = [DealRequestStruct]
  const functionToCall = "makeDealProposal"
  const daoDealClient = await ethers.getContract("DaoDealClient")
  //TODO args is the custom struct with all the info. apparently you just need 4. get all that info from the other react file.
  const encodedFunctionCall = daoDealClient.interface.encodeFunctionData(functionToCall, args)
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  const governor = await ethers.getContract("GovernorContract")
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
  console.log("Queued and Executed!")
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
