import React, {useMemo} from "react";
import '../styles/widgets/TagWidget.css'

function getStyles(props) {
    if(props.name === "No cows selected" || props.name === "No available data in selection" || props.date)
        return "tag-widget-single"
    else if(props.name === "Please wait")
        return "tag-widget-disabled"
    else if (props.name === "Select all" && props.enableSelectAll === 1)
        return "tag-widget-all"
    else if (props.name === "Select all" && props.enableSelectAll === 0)
        return "tag-widget-disabled"
    else if (props.name === "Select none" && props.enableSelectNone === 1)
        return "tag-widget-none"
    else if (props.name === "Select none" && props.enableSelectNone === 0)
        return "tag-widget-disabled"
    else 
        return "tag-widget"
}

export default function TagWidget(props) {
    const style = useMemo(() => getStyles(props), [props])

    return (
        <span className={style} onClick={props.onClick}>
            <p className="tag-text">{props.name}</p>
        </span>
    );
}
