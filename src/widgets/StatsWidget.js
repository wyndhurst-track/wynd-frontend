import React from "react";
import '../styles/widgets/StatsWidget.css'
import TagWidget from "./TagWidget";

export default class StatsWidget extends React.Component {
    constructor(props) {
        super(props)

        var endDate = new Date();
        var startDate = new Date();
        endDate.setDate(endDate.getDate());
        startDate.setDate(startDate.getDate() - 2);

        this.state = {
            selectStartDate: startDate.getTime(),
            selectEndDate: endDate.getTime(),
            enableSlider: 0,
            currentTick: 0,
            loop: 0
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

    handleSliderUpdate(event) {
        var newValue = event.target.value;
        this.setState({
            currentTick: newValue
        }, this.props.updateSelectedDate(this.getTickDates()[newValue]))
    }

    loopDates() {
        var newValue = (this.state.currentTick + 1) % this.getTickDates().length;
        this.setState({
            currentTick: newValue
        }, this.props.updateSelectedDate(this.getTickDates()[newValue]))
    }

    getTickDates() {
        var dates = []
        var cowList = [...this.props.cowList]
        for (var i = 0; i < cowList.length; i++) {
            var date = cowList[i][4]
            if(!dates.includes(date))
                dates.push(date.substring(5, 25))
        }
        return dates
    }

    getTicks() {
        var dates = [];
        var ticks = [];
        var cowList = [...this.props.cowList];
        for (var i = 0; i < cowList.length; i++) {
            var date = cowList[i][4];
            if(!dates.includes(date)) {
                dates.push(date);
            }
        }
        for (var ii = 0; ii < dates.length; ii++) {
            var tickKey = dates[ii];
            ticks.push(
                <option key={tickKey}>{dates[ii]}</option>
            )
        }
        return(ticks);
    }

    render() {
        var ticks = this.getTickDates();

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
                {   
                    ticks.length >= 1
                    &&
                    <>
                        <div className="stats-text">Select Date and Time:</div>
                        <input type="range" 
                                list="ticks"
                                min={0}
                                max={ticks.length - 1} 
                                value={this.state.currentTick} 
                                className="slider"
                                onChange={(e) => this.handleSliderUpdate(e)
                        }></input>
                        <datalist id="ticks">
                            {this.getTicks()}
                        </datalist>
                        <TagWidget name={ticks[this.state.currentTick]} date="1" />
                        <TagWidget onClick={() => this.loopDates()} name="Step Time" />
                    </>
                }
                {
                    ticks.length < 1
                    &&
                    <TagWidget name="No available data in selection" />
                }
            </div>
        );
    }
}
