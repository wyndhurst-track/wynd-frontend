import React from "react";
import '../styles/widgets/SelectWidget.css'
import CowSelectorRowWidget from "./CowSelectorRowWidget";
import TagWidget from "./TagWidget";

export default class SelectWidget extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     selectedCows: [],
        //     availableCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
        //     searchedCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
        //     searchText: ''
        // }
        
        // var enableAll = 0, enableNone = 0;

        // if (this.state.availableCows.length !== 0)
        //     enableAll = 1;
        // if (this.state.selectedCows.length !== 0)
        //     enableNone = 1;

        this.state = {
            selectedCows: [],
            availableCows: [],
            searchedCows: [],
            searchText: '',
            enableSelectAll: 0,
            enableSelectNone: 0,
            dataFetched: 0
        }
    }

    componentDidMount = () => {
        fetch("http://127.0.0.1:5001/cows")
            .then(res => res.json())
            .then(
                (result) => {
                    var cowResult = []; 
                    for (var i = 0; i < result.length; i++){
                        cowResult.push(parseInt(result[i][0]));
                    }
                    this.setState({
                        dataFetched: 1,
                        availableCows: [...cowResult],
                        searchedCows: [...cowResult]
                    }, () => {
                        var enableAll = 0, enableNone = 0;

                        if (this.state.availableCows.length !== 0)
                            enableAll = 1;
                        if (this.state.selectedCows.length !== 0)
                            enableNone = 1;

                        this.setState({
                            enableSelectAll: enableAll,
                            enableSelectNone: enableNone
                        })
                    });
                }
            )
    }

    getRandomKey(name, salt) {
        return String(name) + String(salt);
    }

    handleSearchTextChange(event) {
        const val = event.target.value;
        this.setState({searchText: val});
        this.updateSelectedCows(val);
    }

    updateSelectedCows(val) {
        var enableAll = 0, enableNone = 0;
        var availCows = [...this.state.availableCows]
        var selCows = [...this.state.selectedCows]

        if (availCows.length !== 0)
            enableAll = 1;
        if (selCows.length !== 0)
            enableNone = 1;

        var cows = []
        for (var i = 0; i < availCows.length; i++) {
            var cow = availCows[i]
            if(String(cow).includes(val))
                cows.push(cow)
        }
        // var sortedCows = cows.sort()
        this.setState({
            searchedCows: cows,
            enableSelectAll: enableAll,
            enableSelectNone: enableNone
        })
    }

    displaySelectedCows() {
        var selectedCowRows = [];
        var keyInc = 0;
        for (var cow in this.state.selectedCows) {
            selectedCowRows.push(<TagWidget name = {this.state.selectedCows[cow]}
                                            enableSelectAll = {this.state.enableSelectAll}
                                            enableSelectNone = {this.state.enableSelectNone}
                                            passedKey={this.getRandomKey("tagwidgetpass", cow)} 
                                            key={this.getRandomKey("tagwidget", cow)} 
                                            onClick={(e) => this.handleSelectedCowClick(e)}/>)
            keyInc = keyInc + 1;
        }
        return selectedCowRows;
    }

    displaySearchedCows() {
        var searchedCowRows = [];
        var sortedCows = [...this.state.searchedCows];
        // sortedCows.sort();
        for (var cow in sortedCows) {
                searchedCowRows.push(<CowSelectorRowWidget name ={sortedCows[cow]} 
                                                            passedKey={this.getRandomKey("cowrowpass", cow)} 
                                                            key={this.getRandomKey("cowrow", cow)} 
                                                            handleSearchCowClick={(e) => this.handleSearchCowClick(e)}/>)
        }
        return searchedCowRows;
    }

    handleSearchCowClick(e) {
        var name = e.target.innerText;
        var found = 0;
        var cowIndex = 0;
        var avalCows = [...this.state.availableCows];
        for (var i = 0; !found && i < avalCows.length; i++){
            if (avalCows[i] === parseInt(name)) {
                found = 1;
                cowIndex = i;
            }
        }

        var srchText = [...this.state.searchText];
        var newSelectedCows = [...this.state.selectedCows];
        var newAvailableCows = [...this.state.availableCows];
        newSelectedCows.push(newAvailableCows[cowIndex]);
        newAvailableCows.splice(cowIndex, 1);

        var enableAll = 0, enableNone = 0;
        if (newAvailableCows.length !== 0)
            enableAll = 1;
        if (newSelectedCows.length !== 0)
            enableNone = 1;

        var cows = []
        for (var ii = 0; ii < newAvailableCows.length; ii++) {
            var cow = newAvailableCows[ii]
            if(String(cow).includes(srchText))
                cows.push(cow)
        }

        this.setState({
            availableCows: newAvailableCows,
            selectedCows: newSelectedCows,
            searchedCows: cows,
            enableSelectAll: enableAll,
            enableSelectNone: enableNone
        }, this.props.updateCows(newSelectedCows))
    }
    
    handleSelectedCowClick(e) {
        var name = e.target.innerText;
        var found = 0;
        var cowIndex = 0;
        var newSelectedCows = [...this.state.selectedCows]
        for (var i = 0; !found && i < newSelectedCows.length; i++){
            if (newSelectedCows[i] === parseInt(name)) {
                found = 1;
                cowIndex = i;
            }
        }

        var srchText = [...this.state.searchText];
        var newAvailableCows = [...this.state.availableCows];
        newAvailableCows.push(newSelectedCows[cowIndex])
        newSelectedCows.splice(cowIndex, 1);

        var enableAll = 0, enableNone = 0;
        if (newAvailableCows.length !== 0)
            enableAll = 1;
        if (newSelectedCows.length !== 0)
            enableNone = 1;

        var cows = []
        for (var ii = 0; ii < newAvailableCows.length; ii++) {
            var cow = newAvailableCows[ii]
            if(String(cow).includes(srchText))
                cows.push(cow)
        }

        this.setState({
            availableCows: newAvailableCows,
            selectedCows: newSelectedCows,
            searchedCows: cows,
            enableSelectAll: enableAll,
            enableSelectNone: enableNone
        }, this.props.updateCows(newSelectedCows))
    }

    handleSelectAllClick(e) {
        var allCows = this.state.availableCows;
        allCows = allCows.concat(this.state.selectedCows)

        this.setState({
            availableCows: [],
            searchedCows: [],
            enableSelectAll: 0,
            enableSelectNone: 1,
            selectedCows: allCows
        }, this.props.updateCows(allCows))
    }

    handleSelectNoneClick(e) {
        var allCows = this.state.selectedCows;
        allCows = allCows.concat(this.state.availableCows)

        this.setState({
            availableCows: allCows,
            selectedCows: [],
            enableSelectAll: 1,
            enableSelectNone: 0,
            searchedCows: allCows
        }, this.props.updateCows([]))
    }

    render() {
        var isFetched = this.state.dataFetched;
        if (!isFetched) {
            return(
                <div className="select-widget">
                    <div className="wait-container">
                        <TagWidget name={"Please wait"}/>
                    </div>
                </div>
            )
        }
        return (
            <div className="select-widget">
                <div className="current-cows">
                    {this.state.selectedCows.length === 0 && 
                        <TagWidget name="No cows selected"/>}
                    {this.state.selectedCows.length !== 0 && 
                        <>{this.displaySelectedCows()}</>}
                </div>
                <div className="cow-list-widget" key={this.getRandomKey("cowlist", 0)}>
                    <div className="select-buttons">
                        <TagWidget name ={"Select all"} 
                                            enableSelectAll = {this.state.enableSelectAll}
                                            enableSelectNone = {this.state.enableSelectNone}
                                            onClick={(e) => this.handleSelectAllClick(e)}/>
                        <TagWidget name ={"Select none"} 
                                            enableSelectAll = {this.state.enableSelectAll}
                                            enableSelectNone = {this.state.enableSelectNone}
                                            onClick={(e) => this.handleSelectNoneClick(e)}/>
                    </div>
                    <input className="search-box" 
                            value={this.state.searchText} 
                            placeholder="Search..." 
                            onChange={event => this.handleSearchTextChange(event)}>        
                    </input>
                    <div className="available-cows" key={this.getRandomKey("availcows", 0)}>
                        {this.state.searchedCows.length === 0 && 
                            <h4 className="no-cows-text" key={this.getRandomKey("availcowsrender", 0)}>No cows available</h4>}
                        {this.state.searchedCows.length !== 0 && 
                            <div key={this.getRandomKey("availcowsrendera", 1)}>{this.displaySearchedCows()}</div>}
                    </div>
                </div>
            </div>
        );
    }
}
