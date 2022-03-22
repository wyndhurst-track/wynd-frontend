import React from "react";
import '../styles/widgets/SelectWidget.css'
import CowSelectorRowWidget from "./CowSelectorRowWidget";
import TagWidget from "./TagWidget";

export default class SelectWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCows: [],
            availableCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
            searchedCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
            searchText: ''
        }
        
        var enableAll = 0, enableNone = 0;

        if (this.state.availableCows.length !== 0)
            enableAll = 1;
        if (this.state.selectedCows.length !== 0)
            enableNone = 1;

        this.state = {
            selectedCows: [],
            availableCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
            searchedCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
            searchText: '',
            enableSelectAll: enableAll,
            enableSelectNone: enableNone
        }
    }

    handleSearchTextChange(event) {
        const val = event.target.value;
        this.setState({searchText: val});
        this.updateSelectedCows(val);
    }

    updateSelectedCows(val) {
        console.log(this.state.availableCows)
        var enableAll = 0, enableNone = 0;

        if (this.state.availableCows.length !== 0)
            enableAll = 1;
        if (this.state.selectedCows.length !== 0)
            enableNone = 1;

        var cows = []
        for (var i = 0; i < this.state.availableCows.length; i++) {
            var cow = this.state.availableCows[i]
            if(cow.includes(val)){
                cows.push(cow)
            }
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
                                            passedKey={keyInc} 
                                            key={cow} 
                                            onClick={(e) => this.handleSelectedCowClick(e)}/>)
            keyInc = keyInc + 1;
        }
        return selectedCowRows;
    }

    displaySearchedCows() {
        var searchedCowRows = [];
        var keyInc = 1;
        for (var cow in this.state.searchedCows) {
                searchedCowRows.push(<CowSelectorRowWidget name ={this.state.searchedCows[cow]} 
                                                            passedKey={keyInc} 
                                                            key={keyInc} 
                                                            handleSearchCowClick={(e) => this.handleSearchCowClick(e)}/>)
                keyInc = keyInc + 1;
        }
        return searchedCowRows;
    }

    handleSearchCowClick(e) {
        var name = e.target.innerText;
        var cowIndex = this.state.availableCows.indexOf(name);

        var newSelectedCows = this.state.selectedCows;
        var newAvailableCows = this.state.availableCows;
        newSelectedCows.push(newAvailableCows[cowIndex]);
        newAvailableCows.splice(cowIndex, 1);

        this.setState({
            availableCows: newAvailableCows,
            selectedCows: newSelectedCows
        }, this.updateSelectedCows(this.state.searchText))
    }
    
    handleSelectedCowClick(e) {
        var name = e.target.innerText;
        var cowIndex = this.state.selectedCows.indexOf(name);

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
        return (
            <div className="select-widget">
                <div className="current-cows" key={this.state.selectedCows.length}>
                    {this.state.selectedCows.length === 0 && 
                        <TagWidget name="No cows selected" passedKey={0}/>}
                    {this.state.selectedCows.length !== 0 && 
                        <>{this.displaySelectedCows()}</>}
                </div>
                <div className="cow-list-widget" key={this.state.searchedCows.length}>
                    <div className="select-buttons">
                        <TagWidget name ={"Select all"} 
                                            passedKey={0} 
                                            key={this.state.enableSelectAll} 
                                            enableSelectAll = {this.state.enableSelectAll}
                                            enableSelectNone = {this.state.enableSelectNone}
                                            onClick={(e) => this.handleSelectAllClick(e)}/>
                        <TagWidget name ={"Select none"} 
                                            passedKey={1} 
                                            key={this.state.enableSelectNone} 
                                            enableSelectAll = {this.state.enableSelectAll}
                                            enableSelectNone = {this.state.enableSelectNone}
                                            onClick={(e) => this.handleSelectNoneClick(e)}/>
                    </div>
                    <input className="search-box" 
                            value={this.state.searchText} 
                            placeholder="Search..." 
                            onChange={event => this.handleSearchTextChange(event)}>        
                    </input>
                    <div className="available-cows" key={this.state.searchedCows.length}>
                        {this.state.searchedCows.length === 0 && 
                            <h4 className="no-cows-text" key={this.state.searchedCows.length}>No cows available</h4>}
                        {this.state.searchedCows.length !== 0 && 
                            <div key={this.state.searchedCows.length}>{this.displaySearchedCows()}</div>}
                    </div>
                </div>
            </div>
        );
    }
}
