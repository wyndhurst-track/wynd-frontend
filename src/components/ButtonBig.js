import React from "react";
import '../styles/components/ButtonBig.css'

export default class ButtonBig extends React.Component {
    render() {
        return (
            <div className='button-big'>
                <h4>{this.props.name}</h4>
            </div>
        );
    }
}
