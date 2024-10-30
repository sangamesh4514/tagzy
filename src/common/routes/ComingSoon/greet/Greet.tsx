import React from 'react';
import './Greet.css';

const Greet = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 to-green-400 p-4 mx-auto mt-2 rounded-md w-fit">
      <div>
        <button className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-3 rounded-full" disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.0}
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8 font-bold"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </button>
      </div>
      <div className="mt-8 text-xl font-semibold text-white md:text-2xl">
        Thank you for subscribing to us!
      </div>
      <div className='line-container'>
        <div className='line-animation'></div>
      </div>
    </div>
  );
};

export default Greet;
