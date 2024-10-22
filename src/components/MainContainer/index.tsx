
import React, { CSSProperties } from 'react';
import './style.css';

const MainContainer = (props: { text: any; subText: any; img: any; reverse?: false | true; }) => {
    const { text, subText, img, reverse = false } = props
    let direction = {
        display: "flex",
        flexDirection: `${reverse ? 'row-reverse' : ''}`
    }

    return (
        <div className="parent" style={ direction as CSSProperties}>
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

