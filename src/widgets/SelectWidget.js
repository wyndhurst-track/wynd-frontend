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
                        cowResult.push(result[i][0]);
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

    getRandomKey() {
        return Math.floor(Date.now() * Math.random());
    }

    handleSearchTextChange(event) {
        const val = event.target.value;
        this.setState({searchText: val});
        this.updateSelectedCows(val);
    }

    updateSelectedCows(val) {
        var enableAll = 0, enableNone = 0;

        if (this.state.availableCows.length !== 0)
            enableAll = 1;
        if (this.state.selectedCows.length !== 0)
            enableNone = 1;

        var cows = []
        for (var i = 0; i < this.state.availableCows.length; i++) {
            var cow = this.state.availableCows[i]
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
                                            passedKey={this.getRandomKey()} 
                                            key={this.getRandomKey()} 
                                            onClick={(e) => this.handleSelectedCowClick(e)}/>)
            keyInc = keyInc + 1;
        }
        return selectedCowRows;
    }

    displaySearchedCows() {
        var searchedCowRows = [];
        var sortedCows = [...this.state.searchedCows];
        sortedCows.sort();
        for (var cow in this.state.searchedCows) {
                searchedCowRows.push(<CowSelectorRowWidget name ={this.state.searchedCows[cow]} 
                                                            passedKey={this.getRandomKey()} 
                                                            key={this.getRandomKey()} 
                                                            handleSearchCowClick={(e) => this.handleSearchCowClick(e)}/>)
        }
        return searchedCowRows;
    }

    handleSearchCowClick(e) {
        var name = e.target.innerText;
        var found = 0;
        var cowIndex = 0;
        for (var i = 0; !found && i < this.state.availableCows.length; i++){
            if (String(this.state.availableCows[i]) === name) {
                found = 1;
                cowIndex = i;
            }
        }

        var newSelectedCows = [...this.state.selectedCows];
        var newAvailableCows = [...this.state.availableCows];
        newSelectedCows.push(newAvailableCows[cowIndex]);
        newAvailableCows.splice(cowIndex, 1);
        console.log(newSelectedCows)
        console.log(newAvailableCows)

        this.setState({
            availableCows: newAvailableCows,
            selectedCows: newSelectedCows
        }, this.updateSelectedCows(this.state.searchText))
    }
    
    handleSelectedCowClick(e) {
        var name = e.target.innerText;
        var found = 0;
        var cowIndex = 0;
        for (var i = 0; !found && i < this.state.selectedCows.length; i++){
            if (String(this.state.selectedCows[i]) === name) {
                found = 1;
                cowIndex = i;
            }
        }

        var newAvailableCows = this.state.availableCows;
        var newSelectedCows = this.state.selectedCows;
        newAvailableCows.push(newSelectedCows[cowIndex])
        newSelectedCows.splice(cowIndex, 1);

        this.setState({
            availableCows: newAvailableCows,
            selectedCows: newSelectedCows
        }, this.updateSelectedCows(this.state.searchText))
    }

    handleSelectAllClick(e) {
        var allCows = this.state.availableCows;
        allCows = allCows.concat(this.state.selectedCows)

        this.setState({
            availableCows: [],
            selectedCows: allCows
        }, this.updateSelectedCows(this.state.searchText))
    }

    handleSelectNoneClick(e) {
        var allCows = this.state.selectedCows;
        allCows = allCows.concat(this.state.availableCows)

        this.setState({
            availableCows: allCows,
            selectedCows: []
        }, this.updateSelectedCows(this.state.searchText))
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
                <div className="cow-list-widget" key={this.getRandomKey()}>
                    <div className="select-buttons">
                        <TagWidget name ={"Select all"} 
                                            passedKey={this.getRandomKey()} 
                                            key={this.getRandomKey()} 
                                            enableSelectAll = {this.state.enableSelectAll}
                                            enableSelectNone = {this.state.enableSelectNone}
                                            onClick={(e) => this.handleSelectAllClick(e)}/>
                        <TagWidget name ={"Select none"} 
                                            passedKey={this.getRandomKey()} 
                                            key={this.getRandomKey()} 
                                            enableSelectAll = {this.state.enableSelectAll}
                                            enableSelectNone = {this.state.enableSelectNone}
                                            onClick={(e) => this.handleSelectNoneClick(e)}/>
                    </div>
                    <input className="search-box" 
                            value={this.state.searchText} 
                            placeholder="Search..." 
                            onChange={event => this.handleSearchTextChange(event)}>        
                    </input>
                    <div className="available-cows" key={this.getRandomKey()}>
                        {this.state.searchedCows.length === 0 && 
                            <h4 className="no-cows-text" key={this.getRandomKey()}>No cows available</h4>}
                        {this.state.searchedCows.length !== 0 && 
                            <div key={this.getRandomKey()}>{this.displaySearchedCows()}</div>}
                    </div>
                </div>
            </div>
        );
    }
}
