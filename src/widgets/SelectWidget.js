import React from "react";
import '../styles/widgets/SelectWidget.css'
import CowSelectorRowWidget from "./CowSelectorRowWidget";
import TagWidget from "./TagWidget";

export default class SelectWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            selectedCows: ["moo A", "moo B"],
            availableCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
            searchedCows: ["moo", "moo 2", "moo 3", "moo 4", "moo 5", "moo 6", "moo 7", "moo 8", "moo 9", "moo 10", "moo 11", "moo 12", "moo 13", "moo 14", "moo 15", "moo 16", "moo 17"],
            searchText: ''
        }

    }

    handleSearchTextChange(event) {
        const val = event.target.value;
        this.setState({searchText: val});
        this.updateSelectedCows(val);
    }

    updateSelectedCows(val) {
        var cows = []
        for (var i = 0; i < this.state.availableCows.length; i++) {
            var cow = this.state.availableCows[i]
            if(cow.includes(val)){
                cows.push(cow)
            }
        }
        this.setState({searchedCows: cows})
    }

    displaySelectedCows() {
        var selectedCowRows = [];
        var keyInc = 0;
        for (var cow in this.state.selectedCows) {
            selectedCowRows.push(<TagWidget name ={this.state.selectedCows[cow]} 
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

    render() {
        return (
            <div className="select-widget">
                <div className="current-cows">
                    {this.state.selectedCows.length === 0 && 
                        <TagWidget name="No cows selected" passedKey={0}/>}
                    {this.state.selectedCows.length !== 0 && 
                        <>{this.displaySelectedCows()}</>}
                </div>
                <div className="cow-list-widget">
                    <input className="search-box" 
                            value={this.state.searchText} 
                            placeholder="Search..." 
                            onChange={event => this.handleSearchTextChange(event)}>        
                    </input>
                    <div className="available-cows">
                        {this.state.searchedCows.length === 0 && 
                            <h4 className="no-cows-text">No cows available</h4>}
                        {this.state.searchedCows.length !== 0 && 
                            <>{this.displaySearchedCows()}</>}
                    </div>
                </div>
            </div>
        );
    }
}
