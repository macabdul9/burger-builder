import React from "react";
// import { Button } from "@material-ui/core";
import classes from './Button.module.css';

const button = props => {
    return (
        <button color={props.type}
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}>
            {props.children}
        </button>
    )
};

export default button;
