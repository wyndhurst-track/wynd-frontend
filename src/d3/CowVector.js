import React, { useState } from 'react';
import * as d3 from 'd3';

const CowVector = (props) => {
    const cowInfo = props.cowInfo;

    return (
        <>
            <line 
                x1={cowInfo[1] * props.widthRatio}
                y1={cowInfo[2] * props.heightRatio}
                x2={cowInfo[1] * props.widthRatio + 50 * Math.cos(cowInfo[3])}
                y2={cowInfo[2] * props.heightRatio + 50 * Math.sin(cowInfo[3])}
                stroke="#3B3B3B" 
                strokeWidth="3"
            />
            <circle
                cx={cowInfo[1] * props.widthRatio}
                cy={cowInfo[2] * props.heightRatio}
                r="18"
                stroke="#3B3B3B" 
                strokeWidth="3" 
                fill="#3B3B3B"
            />
            <text 
                x={cowInfo[1] * props.widthRatio} 
                y={cowInfo[2] * props.heightRatio + 5}
                text-anchor="middle" 
                stroke="#FFF9F3" 
                strokeWidth="1px"
                > 
                {cowInfo[0]}
            </text>

        </>
    )
  }

export default CowVector;