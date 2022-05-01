import React, { useState } from 'react';
import * as d3 from 'd3';

const CowVector = (props) => {
    const [cowData, setCowData] = useState(props);
  
    return (
        <svg>
            <circle
                cx={cowData.cx}
                cy={cowData.cy}
                r="50"
            />
        </svg>
    )
  }

export default CowVector;