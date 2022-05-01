import React from "react";
import '../styles/widgets/StatsWidget.css'

export default class StatsWidget extends React.Component {
    constructor(props) {
        super(props)

        var endDate = new Date();
        var startDate = new Date();
        endDate.setDate(endDate.getDate());
        startDate.setDate(startDate.getDate() - 2);

        this.state = {
            selectStartDate: startDate.getTime(),
            selectEndDate: endDate.getTime()
        }
    }

    handleDateUpdate(event, start) {
        var newDate = event.target.value;
        var newDateYear = newDate.substring(0, 4)
        var newDateMonth = newDate.substring(5, 7) - 1;
        var newDateDay = newDate.substring(8, 10);
        var newDateUnix = new Date(newDateYear, newDateMonth, newDateDay).getTime();
        if(start){
            this.setState({selectStartDate: newDateUnix}, this.props.updateStartDate(newDateUnix));
        } else {
            this.setState({selectEndDate: newDateUnix}, this.props.updateEndDate(newDateUnix));
        }
    }

    render() {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate());
        var todayIso = todayDate.toISOString().substring(0, 10); 
        var minDate = new Date(2022, 3, 21);
        var minIso = minDate.toISOString().substring(0, 10);

        var selectStartDateOff = new Date(this.state.selectStartDate);
        selectStartDateOff.setDate(selectStartDateOff.getDate() + 1);
        var selectEndDateOff = new Date(this.state.selectEndDate);
        selectEndDateOff.setDate(selectEndDateOff.getDate() + 1);

        var selectStartDateString = new Date(selectStartDateOff).toISOString().substring(0, 10);
        var selectEndDateString = new Date(selectEndDateOff).toISOString().substring(0, 10);

        return (
            <div className="stats-widget">
                <div className="stats-text">Start Date:</div>
                <input type="date" 
                    className="dateSelector" 
                    min={minIso} 
                    max={todayIso} 
                    value={selectStartDateString} 
                    onChange={(e) => this.handleDateUpdate(e, 1)}>
                </input>
                <div className="stats-text">End Date:</div>
                <input type="date" 
                    className="dateSelector" 
                    min={minIso} 
                    max={todayIso} 
                    value={selectEndDateString} 
                    onChange={(e) => this.handleDateUpdate(e, 0)}>
                </input>
            </div>
        );
    }
}
