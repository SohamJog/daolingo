import React, { useState, useEffect } from 'react';
import { getAllProposals } from '@/scripts/polybase';


const Archive = () => {
  // Dummy data
  const [data, setData] = useState([]);
  
  
  return (
    <div className="pt-32 relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521920592574-49e0b121c964?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 bg-black bg-opacity-75 py-16">
      



        <h2 className="my-10 text-4xl font-bold text-white text-center">Archive</h2>
        <div className="flex flex-col justify-center items-center my-10">
        
          {data.map((item, index) => (
            <div key={index} className="bg-white text-black p-6 rounded shadow my-4 w-96">
              <div className="grid grid-cols-2 gap-4">
                <p className="font-bold">Language:</p>
                <p>{item.language}</p>
                <p className="font-bold">Data Type:</p>
                <p>{item.dataType}</p>
                <p className="font-bold">Information Type:</p>
                <p>{item.informationType}</p>
              </div>
              <div className="mt-4">
                <a href={item.carLink} download className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
                  Download
                </a>
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleVoteFor(item.id)}>
                  Vote For
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleVoteAgainst(item.id)}>
                  Vote Against
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archive;
