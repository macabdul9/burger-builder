import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { Button } from '@material-ui/core';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map((ctrl)=>(
          <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            add={()=>props.add(ctrl.type)}
            remove={()=>props.remove(ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}
            ></BuildControl>    
        ))}
        <Button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
        >ORDER NOW</Button>
    </div>
);

export default buildControls;