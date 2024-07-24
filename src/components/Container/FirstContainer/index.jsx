
import React from 'react';
import './style.css';

const FirstConatiner = () => {

  return (
    <div className="wrapper">
      <div className="text">
        <h1 className="text1">
          Marketplace For local Services
        </h1>
        <p className="text2">
          At Assembly HOA Management, we combine Los Angeles's best managers with modern transparent software to make your HOA experience seamless and stress-free.
        </p>
      </div>
      <div className="image">
        <img src='/tree.png' alt='tagImage'/>
      </div>
    </div>
  );
};

export default FirstConatiner;

