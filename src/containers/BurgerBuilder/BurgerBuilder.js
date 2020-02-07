import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
// import { PassThrough } from 'stream';


const INGREDIENTS_PRICE = {
    salad :1.0,
    meat:2.6,
    bacon:1.6,
    cheese:1.5
}
class BurgerBuilder extends React.Component{

    state={
        ingredients:{
            cheese:0,
            meat:0,
            salad:0,
            bacon:0,
        },
        totalPrice:5.0,
        purchasable:false
    }
    

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum + el
        }, 0);
        this.setState({purchasable:sum>0})
        
    }
    addIngredientHandler = (type) =>{

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const updatedPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);

    }
    removeIngredientHandler = (type) =>{

        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const updatedPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);


    }

    render(){
        console.log(this.state.purchasable);
        console.log(Object.values(this.state.ingredients).reduce((sum, el)=>{return sum+el}, 0))
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Burger 
                    ingredients={this.state.ingredients}
                ></Burger>
                <BuildControls 
                    add = {this.addIngredientHandler}
                    remove = {this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    purchasable={this.state.purchasable}
                    totalPrice={this.state.totalPrice}
                ></BuildControls>


            </Aux>
        )
    };
};

export default BurgerBuilder;