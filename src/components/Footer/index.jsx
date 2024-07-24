import React, { useState } from 'react';
import './App.css';

const App = () => {

    return (
        <div className="container">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="box-container">
                    <div
                        className={`box ${activeSteps[index] ? 'active' : 'inactive'}`}
                    >
                        {activeSteps[index] ? (
                            <span>Step {index + 1}</span>
                        ) : (
                            <>
                                <span className="blur-text">Step {index + 1}</span>
                                <span className="symbol">🚫</span>
                            </>
                        )}
                        {index < 3 && <div className="line" />}
                        {activeSteps[index] && (
                            //   <svg height="100%" width="100%" 
                            //   className="border-svg"
                            //   xmlns="http://www.w3.org/2000/svg">
                            //   <rect
                            //     rx="8"
                            //     ry="8"
                            //     class="line"
                            //     height="100%"
                            //     width="100%"
                            //     stroke-linejoin="round"
                            //     // className="border-rect"
                            //   />
                            // </svg>
                            <div className="card example-5">
                                <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                                    <rect
                                        rx="8"
                                        ry="8"
                                        class="line"
                                        height="100%"
                                        width="100%"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>

                        )}
                    </div>
                </div>
            ))}
            <button className="next-button" onClick={handleButtonClick}>
                Next
            </button>
        </div>
    );
};

export default App;
