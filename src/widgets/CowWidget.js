import React from "react";
import useResizeObserver from "use-resize-observer";
import '../styles/widgets/CowWidget.css';

import CowVector from "../d3/CowVector";

function getCattle(cowData, widthRatio, heightRatio) {
    let cowVectors = [];
    for (let i = 0; i < cowData.length; i++) {
        cowVectors.push(
            <CowVector 
                cowInfo={cowData[i]}
                widthRatio={widthRatio}
                heightRatio={heightRatio}
                key={cowData[i]}
            />
        );
    }
    return cowVectors;
}

const CowWidget = (props) => {
    const { ref, width, height } = useResizeObserver();
    const cameraWidth = 2560;
    const cameraHeight = 1440;

    const widthRatio = width / cameraWidth;
    const heightRatio = height / cameraHeight;

    var cowVectors = getCattle(props.cowData, widthRatio, heightRatio);

    return (
        <div ref={ref} className="cow-widget">
            <svg width="100%" height="100%">
                {cowVectors}
            </svg> 
        </div>
    );
};

export default CowWidget;