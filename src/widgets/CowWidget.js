import React from "react";
import '../styles/widgets/CowWidget.css';

import CowVector from "../d3/CowVector";

export default class CowWidget extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="cow-widget">
                {this.props.cowData && <CowVector cowData={this.props.cowData}/>}
            </div>
        );
    }
}
