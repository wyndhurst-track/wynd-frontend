import React from "react";
import '../styles/components/Body.css'
import CowWidget from '../widgets/CowWidget.js';
import SelectWidget from '../widgets/SelectWidget.js';

export default class Body extends React.Component {
    render() {
        return (
            <div className="content-body">
                <SelectWidget />
                <CowWidget />
            </div>
        );
    }
}
