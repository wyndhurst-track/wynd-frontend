import React from "react";
import '../styles/widgets/TagWidget.css'

export default class TagWidget extends React.Component {
    constructor(props) {
        super(props)

        if(this.props.name === "No cows selected")
            this.style = "tag-widget-single"
        else if(this.props.name === "Please wait")
            this.style = "tag-widget-disabled"
        else if (this.props.name === "Select all" && this.props.enableSelectAll === 1)
            this.style = "tag-widget-all"
        else if (this.props.name === "Select all" && this.props.enableSelectAll === 0)
            this.style = "tag-widget-disabled"
        else if (this.props.name === "Select none" && this.props.enableSelectNone === 1)
            this.style = "tag-widget-none"
        else if (this.props.name === "Select none" && this.props.enableSelectNone === 0)
            this.style = "tag-widget-disabled"
        else 
            this.style = "tag-widget"
    }

    render() {
        return (
            <span className={this.style} onClick={this.props.onClick}>
                <p className="tag-text">{this.props.name}</p>
            </span>
        );
    }
}
