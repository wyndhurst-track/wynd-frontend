import React from "react";
import '../styles/components/Header.css'
import ButtonBig from "./ButtonBig";

export default class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <a href="https://www.bristol.ac.uk/vet-school/" target="_blank" rel="noreferrer" className="anchor"><ButtonBig name="About" /></a>
                <a href="https://github.com/wyndhurst-track" target="_blank" rel="noreferrer" className="anchor"><ButtonBig name="GitHub" /></a>
            </div>
        );
    }
}
