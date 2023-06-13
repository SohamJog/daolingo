import React from 'react';

const VoterPage = () => {
  // Dummy data
  const data = [
    {
      language: 'English',
      dataType: 'Text',
      informationType: 'News',
      carLink: 'https://example.com/download',
    },
    {
      language: 'Spanish',
      dataType: 'Video',
      informationType: 'Entertainment',
      carLink: 'https://example.com/download',
    },
    {
      language: 'French',
      dataType: 'Audio',
      informationType: 'Podcast',
      carLink: 'https://example.com/download',
    },
  ];

  return (
    <div className="bg-black text-white p-6">

      <h2 className="my-28 text-2xl font-bold mb-6">Current proposals</h2>
      <div className='my-32'>

      {data.map((item, index) => (
        <div key={index} className="bg-white text-black p-6 rounded shadow mb-6">
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
          <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Vote
          </button>
        </div>
      ))}

      </div>

    </div>
  );
};

export default VoterPage;
