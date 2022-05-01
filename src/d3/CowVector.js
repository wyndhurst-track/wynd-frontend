import React, { useState } from 'react';
import * as d3 from 'd3';

const CowVector = (props) => {
    const [prp, setPrp] = useState(props);
    const cowData = prp.cowData;

    return (
        <svg>
            <circle
                cx={cowData[1]}
                cy={cowData[2]}
                r="10"
            />
        </svg>
    )
  }

export default CowVector;