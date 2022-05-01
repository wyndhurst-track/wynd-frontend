import React from "react";
import '../styles/components/Body.css'
import CowWidget from '../widgets/CowWidget.js';
import SelectWidget from '../widgets/SelectWidget.js';
import StatsWidget from "../widgets/StatsWidget";

export default class Body extends React.Component {
    constructor(props) {
        super(props)

        var endDate = new Date();
        var startDate = new Date();
        endDate.setDate(endDate.getDate());
        startDate.setDate(startDate.getDate() - 2);

        this.state = {
            selectedCows: [],
            selectStartDate: startDate.getTime(),
            selectEndDate: endDate.getTime(),
            cowData: []
        }
    }

    updateCows(newCows) {
        this.setState({
            selectedCows: newCows
        }, this.getCowDataNewCows(newCows));
    }

    updateStartDate(newStartDate) {
        this.setState({
            selectStartDate: newStartDate
        }, this.getCowDataNewStart(newStartDate))
    }

    updateEndDate(newEndDate) {
        this.setState({
            selectEndDate: newEndDate
        }, this.getCowDataNewEnd(newEndDate))
    }

    getCowDataNewCows(newCows) {
        var head = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "cow-list": newCows,
                "start-time": this.state.selectStartDate,
                "end-time": this.state.selectEndDate
            }
        }

        fetch("http://127.0.0.1:5002/data", head)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cowData: result
                    })
                }
            )
    }

    getCowDataNewStart(newStart) {
        var head = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "cow-list": this.state.selectedCows,
                "start-time": newStart,
                "end-time": this.state.selectEndDate
            }
        }

        fetch("http://127.0.0.1:5002/data", head)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cowData: result
                    })
                }
            )
    }

    getCowDataNewEnd(newEnd) {
        var head = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "cow-list": this.state.selectedCows,
                "start-time": this.state.selectStartDate,
                "end-time": newEnd
            }
        }

        fetch("http://127.0.0.1:5002/data", head)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cowData: result
                    })
                }
            )
    }

    render() {
        return (
            <div className="content-body">
                <SelectWidget updateCows={(e) => this.updateCows(e)}/>
                <StatsWidget cowList={this.state.cowData} updateStartDate={(e) => this.updateStartDate(e)} updateEndDate={(e) => this.updateEndDate(e)}/>
                <CowWidget cowData={this.state.cowData[0]}/>
            </div>
        );
    }
}
