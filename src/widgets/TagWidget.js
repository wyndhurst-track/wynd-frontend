import React from "react";
import '../styles/widgets/TagWidget.css'

export default class TagWidget extends React.Component {
    constructor(props) {
        super(props)

        if(this.props.name==="No cows selected")
            this.style = "tag-widget-single"
        else
            this.style = "tag-widget"
    }

    render() {
        return (
            <span className={this.style} key={this.props.passedKey} onClick={this.props.onClick}>
                <p className="tag-text">{this.props.name}</p>
            </span>
        );
    }
}
