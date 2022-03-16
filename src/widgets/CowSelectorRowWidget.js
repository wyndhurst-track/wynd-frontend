import React from "react";
import '../styles/widgets/CowSelectorRowWidget.css'

export default class CowSelectorRowWidget extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <span className="cow-selector-row-widget" id={this.props.id}>
                <p className="row-text">{this.props.name}</p>
            </span>
        );
    }
}
