import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-xl text-gray-600">Oops! Looks like you've ventured into uncharted territory.</p>
        </div>

        {/* <div className="relative w-full h-64">
          <img
            src={process.env.PUBLIC_URL + '/404-astronaut.png'}
            alt="Lost astronaut"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative w-full h-40">
          <img
            src={process.env.PUBLIC_URL + '/404-ufo.gif'}
            alt="UFO animation"
            className="w-full h-full object-contain"
          />
        </div> */}

        <div className="space-y-4">
          <p className="text-lg text-gray-600">Don't worry, our rescue team is on the way!</p>
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

