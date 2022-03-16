import React from "react";
import '../styles/components/Header.css'
import ButtonBig from "./ButtonBig";

export default class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <ButtonBig name="Home" />
                <ButtonBig name="About" />
                <ButtonBig name="GitHub" />
            </div>
        );
    }
}
