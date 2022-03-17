import React from "react";
import '../styles/widgets/CowSelectorRowWidget.css'

export default class CowSelectorRowWidget extends React.Component {
    render() {
        return (
            <span className="cow-selector-row-widget" key={this.props.passedKey} onClick={this.props.handleSearchCowClick}>
                <p className="row-text">{this.props.name}</p>
            </span>
        );
    }
}
