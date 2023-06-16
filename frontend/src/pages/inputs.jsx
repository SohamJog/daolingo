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
  const [txSubmitted, setTxSubmitted] = useState(false);
  const [dealID, setDealID] = useState("");
  const [proposingDeal, setProposingDeal] = useState(false);
  const [language, setLanguage] = useState("");
  const [dataType, setDataType] = useState("");
  const [informationType, setInformationType] = useState("");
  const [languageFamily, setLanguageFamily] = useState("");
  const [description, setDescription] = useState("");



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

  const handleChangeLanguageFamily = (event) => {
    setLanguageFamily(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
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

 async function changeProposing() {
    setProposingDeal(true);
 }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // do something with the carLink value, like send it to a backend API
    await changeProposing();
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
          await createProposal(languageFamily, description, signer.address, proposalId, language, dataType, informationType, DealRequestStruct);

        //End of TODO



        // the Proposal State is an enum data type, defined in the IGovernor contract.
        // 0:Pending, 1:Active, 2:Canceled, 3:Defeated, 4:Succeeded, 5:Queued, 6:Expired, 7:Executed
        console.log(`Current Proposal State: ${proposalState}`)
        setProposingDeal(false);
        setTxSubmitted(true)


        // end of TODO





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

  

  

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div id="container" className="bg-black flex flex-col items-center ">




        <div className="mt-32 text-white">
          <div className="flex items-center mb-4">
            <div className="step-number bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              1
            </div>
            <div>
              Go to <a href="https://data.lighthouse.storage/dashboard" className="text-teal-500">lighthouse.storage</a>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="step-number bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              2
            </div>
            <div>
              Upload your file to lighthouse.storage, it's like a temporary storage for your file.
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="step-number bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              3
            </div>
            <div>
              Put in the car link and some other info in this form. You will get this info when you click on your uploaded file in lighthouse.storage.
            </div>
          </div>
          <div className="flex items-center">
            <div className="step-number bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              4
            </div>
            <div>
              Click propose! We'll notify you when your proposal has passed!
            </div>
          </div>
        </div>


  
    <form className="my-16 child-1 bg-white p-8 rounded shadow-lg w-5/12" onSubmit={handleSubmit}>
  
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
        <label className="mb-1">Piece CID</label>
  
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

     <div> <label className="mb-1">Language Name</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={language} onChange={handleChangeLanguage} />
      <div> <label className="mb-1">Data Type. (Eg. PDF, Audio, JSON, collection of PDFs, etc.)</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={dataType} onChange={handleChangeDataType} />
      <div> <label className="mb-1">Information Type. (Eg. Dictionary, Book, Misc)</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={informationType} onChange={handleChangeInformationType} />

      <div> <label className="mb-1">Description of the content</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={description} onChange={handleChangeDescription} />

      <div> <label className="mb-1">Language Family</label></div>
      <input className="input-elem bg-gray-100 rounded w-full mb-4 p-2" type="text" value={languageFamily} onChange={handleChangeLanguageFamily} />
      


  
      <button
        type="submit"
        className="block bg-teal-500 text-white text-center rounded px-4 py-2 w-full mb-4 hover:bg-teal-600 transition-colors"
        disabled={proposingDeal}
      >
        {proposingDeal ? "Proposing..." : (txSubmitted ? "You're all set!" : "Propose!")}
      </button>

  
      <div className="text-red-500 mb-2">{errorMessageSubmit}</div>
      {proposingDeal && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <div className="text-green-500 mb-2">{txSubmitted}</div>
    </form>
  
   
  
    {dealID && <div className="text-green-500 mx-auto">Deal: {dealID}</div>}
  </div>
  

  );
}

export default Inputs;
