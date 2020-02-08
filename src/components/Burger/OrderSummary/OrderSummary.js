import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igKey=>{
        return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
            </li>
        );
    });

    return (
        <Aux>
            <h3>You Order:</h3>
            <p>A delicious burger with following ingredients :</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Do you want continue to checkout ?</p>
            <Button btnType='Danger' color='secondary' clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' color='primary' clicked={props.success}>PROCEED</Button>
        </Aux>

    );
}

export default orderSummary;

