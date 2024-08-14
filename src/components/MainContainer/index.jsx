
import React from 'react';
import './style.css';

const MainContainer = (props) => {
    const { text, subText, img, reverse = false } = props

    return (
        <div className="parent" style={{ flexDirection: reverse ? 'row-reverse' : '' }}>
            <div className="child1">
                <p className="text">
                    {text}
                </p>
                <p className="subText">
                    {subText}
                </p>
            </div>
            <div className="child2">
                <img src={img} alt="" />
            </div>
        </div>
    );
};

export default MainContainer;

