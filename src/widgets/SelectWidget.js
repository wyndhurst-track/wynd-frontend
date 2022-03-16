import React from "react";
import '../styles/widgets/SelectWidget.css'
import CowSelectorRowWidget from "./CowSelectorRowWidget";
import TagWidget from "./TagWidget";

export default class SelectWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            selectedCows: [],
            availableCows: ["moo"]
        }
    }

    render() {
        return (
            <div className="select-widget">
                <div className="current-cows">
                    {this.state.selectedCows.length === 0 && <TagWidget name="No cows selected" id="0" />}
                </div>
                <div className="cow-list-widget">
                    <input className="search-box" placeholder="Search..."></input>
                    <div className="available-cows">
                        {this.state.availableCows.length === 0 && <h4 className="no-cows-text">No cows available</h4>}
                        {this.state.availableCows.length !== 0 && <CowSelectorRowWidget name="Cow 1" id="0" />}
                    </div>
                </div>
            </div>
        );
    }
}
