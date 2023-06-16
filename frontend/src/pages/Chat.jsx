import { getMessages } from '@/scripts/polybase';
import React, { useEffect } from 'react';

const Chat = (props ) => {
  const proposalId = props.proposalId;
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');

  useEffect(() => {
    //console.log(proposalId)
    // Fetch messages from the server and add them to the messages state
    getAllMessages()
  }, []);

  async function getAllMessages() {
    const messages = await getMessages(proposalId);
    setMessages(messages);
    //console.log(messages)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage('');
    }
  };

  const handleCloseChat = () => {
    // Handle closing the chat component here
    props.handleCloseChat();
  };
  const truncatedProposalId =
    proposalId.length > 5 ? `${proposalId.slice(0, 5)}...` : proposalId;


    const truncate = (str) => {
      return str.length > 10 ? str.substring(0, 7) + "..." : str;
    }

  
  return (
    <div className="fixed bottom-5 right-5 w-96 bg-white rounded shadow-md">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
        <h4 className="text-lg font-bold">Chat - Proposal #{truncatedProposalId}</h4>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleCloseChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 19a9 9 0 100-18 9 9 0 000 18zm-.293-8.707a1 1 0 011.414 0L12 11.586l2.293-2.293a1 1 0 111.414 1.414L13.414 13l2.293 2.293a1 1 0 01-1.414 1.414L12 14.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 13l-2.293-2.293a1 1 0 010-1.414l2.293-2.293L9.293 6.707a1 1 0 111.414-1.414L11 7.586l2.293-2.293a1 1 0 011.414 1.414L12.414 9l2.293 2.293a1 1 0 010 1.414L13.586 11l2.293 2.293a1 1 0 01-1.414 1.414L12 12.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 11l-2.293-2.293a1 1 0 010-1.414L9.293 6.293 7 8.586a1 1 0 01-1.414-1.414L6.586 5 4.293 2.707a1 1 0 011.414-1.414L9 3.586 11.293.293a1 1 0 011.414 0L14.586 3l2.293-2.293a1 1 0 111.414 1.414L16.414 5l2.293 2.293a1 1 0 010 1.414L17 8.414l2.293 2.293a1 1 0 01-1.414 1.414L15.586 10l-2.293 2.293a1 1 0 01-1.414-1.414L13.414 9l-2.293-2.293a1 1 0 010-1.414L12 6.414 9.707 4.121a1 1 0 111.414-1.414L13 5.586l2.293-2.293a1 1 0 111.414 1.414L14.414 7l2.293 2.293a1 1 0 01-1.414 1.414L13 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 7z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="px-4 py-2 h-40 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{truncate(message.messenger)}: </span> {message.message}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t px-4 py-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          placeholder="Type your message..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
