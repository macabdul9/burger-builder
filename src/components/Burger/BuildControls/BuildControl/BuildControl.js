import React from 'react';
import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <Button 
            className={classes.More} 
            onClick={props.add}
        >Add</Button>
        <Button 
            className={classes.Less} 
            onClick={props.remove}
            disabled={props.disabled}
             >Remove</Button>
    </div>
);

export default buildControl;
