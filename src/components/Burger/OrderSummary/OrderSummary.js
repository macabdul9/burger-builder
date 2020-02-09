import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


class OrderSummary extends React.Component{

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
    .map(igKey=>{
        return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
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
            <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Do you want continue to checkout ?</p>
            <Button btnType='Danger' color='secondary' clicked={this.props.cancel}>CANCEL</Button>
            <Button btnType='Success' color='primary' clicked={this.props.success}>PROCEED</Button>
        </Aux>

    );
    }
}

export default OrderSummary;

