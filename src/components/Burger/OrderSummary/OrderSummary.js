import React from 'react';
import Aux from '../../../hoc/Auxiliary';

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
            <p>Do you want continue to checkout ?</p>
        </Aux>

    );
}

export default orderSummary;

