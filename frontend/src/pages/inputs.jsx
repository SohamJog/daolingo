//TODO
// Get the abis for the contract
// Refer to queue-and-execute.js for how to interact with the contract


import React, { useState, useEffect } from "react";
import governorContract from "../../contracts/GovernorContract.json";
import clientContract from "../../contracts/DaoDealClient.json";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
//import { ethers } from "ethers";
import { ethers } from "ethers";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Spinner from 'react-bootstrap/Spinner';
import CID from "cids";
import { checkWalletIsConnected } from "@/scripts/wallet";
import { governorContractAddress, daoDealClientAddress } from "@/scripts/aux";
import { createProposal } from "@/scripts/polybase";
import { Buffer } from 'buffer';


 // Replace this address with the address of own instance of the deal client contract

//const governorContractAddress = governorContractAddress;
const governorContractABI = governorContract.abi;
const clientContractAddress = daoDealClientAddress;
const clientContractABI = clientContract.abi;
let daoDealClient;
let dealClient;
let governor;
let cid;

function Inputs() {
  // Initialize with some dummy working default values
  const [commP, setCommP] = useState(
    "baga6ea4seaqkp2pjlh6avlvee6ib2maanav5sc35l5glf3zm6rd6hmfgcx5xeji"
  );
  const [carLink, setCarLink] = useState(
    "https://data-depot.lighthouse.storage/api/download/download_car?fileId=862fb115-d24a-4ff1-a1c8-eadbbbfd19cf.car"
  );
  const [errorMessageSubmit, setErrorMessageSubmit] = useState("");
  const [pieceSize, setPieceSize] = useState("32768");
  const [carSize, setCarSize] = useState("18445");
  const [txSubmitted, setTxSubmitted] = useState("");
  const [dealID, setDealID] = useState("");
  const [proposingDeal, setProposingDeal] = useState(false);
  const [language, setLanguage] = useState("");
  const [dataType, setDataType] = useState("");
  const [informationType, setInformationType] = useState("");


  //const [network, setNetwork] = useState("");

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
  };

  const handleChangeInformationType = (event) => {
    setInformationType(event.target.value);
  };

  const handleChangeCommP = (event) => {
    setCommP(event.target.value);
  };

  const handleChangeCarLink = (event) => {
    // validate input data here
    setCarLink(event.target.value);
  };

  const handleChangePieceSize = (event) => {
    setPieceSize(event.target.value);
  };

  const handleChangeCarSize = (event) => {
    setCarSize(event.target.value);
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    // do something with the carLink value, like send it to a backend API
  
    try {
      setErrorMessageSubmit(
        ""
      );
      cid = new CID(commP);

      const { ethereum } = window;
      
      if (ethereum) {

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        daoDealClient = new ethers.Contract(
          clientContractAddress,
          clientContractABI,
          signer
        );

        governor = new ethers.Contract(
          governorContractAddress,
          governorContractABI,
          signer
        );




        
        const extraParamsV1 = [
          carLink,
          carSize,
          false, // taskArgs.skipIpniAnnounce,
          false, // taskArgs.removeUnsealedCopy
        ];



        //TODO this is the one we have to use
        const cidHexString = `0x${Buffer.from(cid.bytes).toString('hex')}`;

        const DealRequestStruct = [
          //cid.bytes ,//cidHex
          cidHexString,
          pieceSize, //taskArgs.pieceSize,
          false, //taskArgs.verifiedDeal,
          commP, //taskArgs.label,
          520000, // startEpoch
          1555200, // endEpoch
          0, // taskArgs.storagePricePerEpoch,
          0, // taskArgs.providerCollateral,
          0, // taskArgs.clientCollateral,
          1, //taskArgs.extraParamsVersion,
          extraParamsV1,
        ];
        
        console.log("here")
        const encodedFunctionCall = daoDealClient.interface.encodeFunctionData("makeDealProposal", [DealRequestStruct]);
        console.log("here")
        console.log(`Proposing on ${clientContractAddress} with ${[DealRequestStruct]} `);



        const proposeTx = await governor.propose(
          [clientContractAddress],
          [0],
          [encodedFunctionCall],
          "Let's put this file in Filecoin!"
        )


        const proposeReceipt = await proposeTx.wait()

        // const logEntry = proposeReceipt.logs[0];
        // const eventData = logEntry.data;
        // const eventDataString = Buffer.from(eventData.slice(2), 'hex').toString();
        // console.log(eventDataString)
        

        //console.log(proposeReceipt.events)
        //let filterFrom = governor.filters.Transfer(signer, null);

        // const eventFilter = governor.filters.ProposalCreated(); // Replace "YourEvent" with the actual name of the event you want to retrieve

        // await governor.queryFilter(eventFilter, proposeReceipt.blockNumber, proposeReceipt.blockNumber)
        //   .then((logs) => {
        //     console.log(logs);
        //   });

          console.log(proposeReceipt)

        const proposalId = proposeReceipt.logs[0].args.proposalId
        console.log(`Proposed with proposal ID:\n  ${proposalId}`)
        const proposalState = await governor.state(proposalId)



        //TODO save the proposalId to Polybase?
          //storeProposalId(proposalId);
          await createProposal(signer.address, proposalId, language, dataType, informationType, DealRequestStruct);

        //End of TODO



        // the Proposal State is an enum data type, defined in the IGovernor contract.
        // 0:Pending, 1:Active, 2:Canceled, 3:Defeated, 4:Succeeded, 5:Queued, 6:Expired, 7:Executed
        console.log(`Current Proposal State: ${proposalState}`)

        // end of TODO

        // console.log("Proposing deal...");
        // setProposingDeal(true);
        // const receipt = await transaction.wait();
        // console.log(receipt);
        // setProposingDeal(false);
        // setTxSubmitted("Transaction submitted! " + receipt.hash);



        //TODO: move this to post voting i'm guessing

        // dealClient.on("DealProposalCreate", (id, size, verified, price)=>{
        //   console.log(id, size, verified, price);
        // })
        // console.log("Deal proposed! CID: " + cid);

        // end of TODO

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setErrorMessageSubmit(
        "Something went wrong. " + error.name + " " + error.message
      );
      return;
    }
  };

  

  const dealIDButton = () => {
    return (
      <button
        onClick={dealIDHandler}
      >
        Get deal ID
      </button>
    );
  };

  const dealIDHandler = async () => {
    setDealID("Waiting for acceptance by SP...");
    cid = new CID(commP);
    var refresh = setInterval(async () => {
        console.log(cid.bytes);
        if (cid === undefined) {
          setDealID("Error: CID not found");
          clearInterval(refresh);
        }
        console.log("Checking for deal ID...");
        const dealID = await dealClient.pieceDeals(cid.bytes);
        console.log(dealID);
        if (dealID !== undefined && dealID !== "0") {
          // If your deal has already been submitted, you can get the deal ID by going to https://hyperspace.filfox.info/en/deal/<dealID>
          // The link will show up in the frontend: once a deal has been submitted, its deal ID stays constant. It will always have the same deal ID.
          setDealID("https://calibration.filfox.info/en/deal/" + dealID);
          clearInterval(refresh);
        }
      }, 5000
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div id="container" className="bg-black flex flex-col items-center ">
  
    <form className="my-32 child-1 bg-white p-8 rounded shadow-lg w-5/12" onSubmit={handleSubmit}>
  
      <div className="child-1-hg mb-4">
        <label className="mb-1">Link to CAR file</label>
  
        <div className="relative">
          <div className="tooltip" data-tooltip-id="carfile-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="Find a URL to your car file by going to data.fvm.dev and uploading your file (site in development).<br />You can also go to tech-greedy/generate-car and upload the resulting car file to web3.storage.">
            <AiOutlineQuestionCircle />
          </div>
          <Tooltip id="carfile-tooltip" />
        </div>
      </div>
  
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={carLink} onChange={handleChangeCarLink} />
  
      <div className="child-1-hg mb-4">
        <label className="mb-1">commP</label>
  
        <div className="tooltip" data-tooltip-id="commp-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="This is also known as the Piece CID.<br />You can go to data.fvm.dev and get this by uploading your file (site in development).<br />This also can be accessed as the output of tech-greedy/generate-car.">
          <AiOutlineQuestionCircle />
        </div>
        <Tooltip id="commp-tooltip" />
      </div>
  
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={commP} onChange={handleChangeCommP} />
  
      <div className="child-1-hg mb-4">
        <label className="mb-1">Piece Size:</label>
  
        <div className="tooltip" data-tooltip-id="piecesize-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="This is the number of bytes of your Piece (you can read more about Filecoin Pieces in the spec).<br />You can go to data.fvm.dev and get this by uploading your file (site in development).<br />This also can be accessed as the output of tech-greedy/generate-car.">
          <AiOutlineQuestionCircle />
        </div>
        <Tooltip id="piecesize-tooltip" />
      </div>
  
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={pieceSize} onChange={handleChangePieceSize} />
  
      <div className="child-1-hg mb-4">
        <label className="mb-1">Car Size:</label>
  
        <div className="tooltip" data-tooltip-id="carsize-tooltip" data-tooltip-delay-hide={50} data-tooltip-html="This is the size of the CAR file in bytes.<br />You can go to data.fvm.dev and get this by uploading your file (site in development).<br />This can be accessed as the output of tech-greedy/generate-car.">
          <AiOutlineQuestionCircle />
        </div>
        <Tooltip id="carsize-tooltip" />
      </div>
  
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={carSize} onChange={handleChangeCarSize} />

     <div> <label className="mb-1">Language</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={language} onChange={handleChangeLanguage} />
      <div> <label className="mb-1">Data Type</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={dataType} onChange={handleChangeDataType} />
      <div> <label className="mb-1">Information Type</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={informationType} onChange={handleChangeInformationType} />

  
      <button type="submit" className="block bg-teal-500 text-white text-center rounded px-4 py-2 w-full mb-4 hover:bg-teal-600 transition-colors">
        Propose!
      </button>
  
      <div className="text-red-500 mb-2">{errorMessageSubmit}</div>
      {proposingDeal && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <div className="text-green-500 mb-2">{txSubmitted}</div>
    </form>
  
    <div className="child-1-hg">
      <div className="flex w-1/2 mx-auto">
        {dealIDButton()}
      </div>
    </div>
  
    {dealID && <div className="text-green-500 mx-auto">Deal: {dealID}</div>}
  </div>
  

  );
}

export default Inputs;
