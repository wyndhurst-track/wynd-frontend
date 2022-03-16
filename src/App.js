import './styles/App.css';
import React from "react";
import Body from './components/Body.js';
import Header from './components/Header.js';

export default class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <Header />
                <Body />
            </div>
        );
    }
}
