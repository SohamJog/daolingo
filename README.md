Currently, hundreds of languages around the world are classified as rare. Experts say that around half of the languages that exist today will stop existing by the next century. Secondly, communities relying on these rare and dying languages lack access to relevant language resources and technological advancements. Insufficient data on these languages hinders the creation of trainable language models.

DAOlingo is a Data DAO specifically designed to address this language crisis. We aim to create an extensive archive of data on rare and dying languages, ensuring their preservation and accessibility.

DAOlingo is an open-to-all DAO where anyone can contribute to the archive and potentially get rewarded for their contribution. DAOlingo uses an aggregator-driven approach to making storage deals. A user interested in contributing is first prompted to store their file temporarily on Lighthouse storage. This file can be anything ranging from a PDF to an audio file. The user then has to pass in the piece CID, the carlink, and some relevant information about the data that they want to provide, like the language family, and description of the data. Once a proposal is made, all the DAO members who hold some amount of DAOlingo tokens can start voting. While voting, they can chat with other DAO members to discuss the validity of a piece of data. Everyone’s profile is public, so you can judge their credibility by just seeing the history of their contributions. Once the voting period ends, and if a proposal gets enough votes, a storage deal is çreated with the help of Filecoin Data Tools, and the file is available in the DAOlingo archive. These files are open to all and can be used for a wide range of purposes from creating dictionaries and tutorials to training language models!

An obvious question that might arise after reading this is, how are people incentivized to upload data, and vote, because both of these actions require gas fees. As a contributor, you get rewarded in DAOlingo tokens for every piece of valid data you contribute. With these tokens, you get the power to vote for other proposals, discuss validity with your fellow DAO members, and (in the future) get access to premium data stored in the DAO. As these tokens have to be ‘mined’, and have some utility, they can get some monetary value in the future as well. Currently, voters are only incentivized to vote out of goodwill since the tokens aren’t that distributed, and all the voter perks aren’t available yet. However, in the future, we plan to build exclusive committees for voters who are experts on certain language families, and these committee members will enjoy some perks.


All the smart contracts for DAOlingo have been deployed on the Calibration Testnet. DAOlingo consists of four components. The first one is the Storage Deal. The storage deal contract is based on the FEVM Basic Deal Client standard. It uses Zondax to communicate with FVM, and makes the process straightforward. It creates a storage deal given all the storage parameters.

The second part is the DAO. This DAO uses the ERC20Votes contract standard by openZeppelin. The Governance contract is the contract that essentially ‘owns’ the DAO. This is based on the Governance standard contracts in openZeppelin. The TimeLock smart contract manages the delays and the minimum voting times for each proposal. The deployment scripts are based on FEVM’s data-dao starter kit. There are three smart contract actions that have to be accessed by the frontend which are: proposing, voting, and queueing and executing. Voting is based on the one-vote-per-token standard like most DAOs.

The third part is Polybase. I have used Polybase for storing the proposal IDs for data proposals. It is also used to store profile information and contribution history of DAO members. This adds to the credibility of these users. Thirdly, I have used Polybase for storing information about the data like the language name, language family, description, data format, and the type of data that is being proposed. This information is also used in displaying in the archive after a data deal is passed. Lastly, I have used Polybase’s speed and efficiency to my advantage by building a full fledged chat application for DAO members to discuss specifics about proposed pieces of data.

Finally, the frontend is built using React.js and Tailwind. I have deployed my live demo website on Spheron.


The backend folder consists of the smart contracts, the deployment scripts, and the testing scripts. The DAO structure is inspired from fevm's data-dao starter kit. https://github.com/filecoin-project/fevm-data-dao-kit

The frontend is built in React.js and Vue.js. It is based on the frontend template here: https://www.creative-tim.com/product/material-tailwind-kit-react. 
You can find most of the frontend scripts in the frontend/src/scripts directory. 




