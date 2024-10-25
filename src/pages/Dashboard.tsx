import React, { useState } from 'react';

const Dashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();  // Clear all local storage
    window.location.reload();  // Refresh the page
  };

  // Search handler for phone number
  const handleSearch = async () => {
    try {
      // Replace this with your API call function
      // const result = await searchByPhoneNumber(phoneNumber);  
      // setSearchResult(result);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Dashboard Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Search by Phone Number</h2>
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Enter phone number" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button 
            onClick={handleSearch} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </div>

      {/* Display Search Results */}
      {searchResult && (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-4">
          <h4 className="text-lg font-medium text-gray-800 mb-2">Search Result:</h4>
          <pre className="text-gray-700 bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(searchResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
