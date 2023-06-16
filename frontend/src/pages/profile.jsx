import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getContributions } from '@/scripts/polybase';

const Profile = (props) => {
  const wallet = props.wallet;
  const handleCloseProfile = props.handleCloseProfile;
  const [data, setData] = React.useState('');

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const temp = await getContributions(wallet);
    setData(temp);
    console.log(temp)
  }

  const handleProfileClose = () => {
    handleCloseProfile();
  };

  return (
    <div className="fixed left-24 top-36 w-64 h-80 bg-white rounded shadow-md overflow-y-auto">
      <div className="p-12 flex justify-between items-center bg-gray-200">
        <h4 className="text-lg font-bold">{wallet}'s profile</h4>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleProfileClose}
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>
      {/* Add your content here */}
    </div>
  );
};

export default Profile;
