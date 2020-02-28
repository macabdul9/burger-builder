import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // console.log(this.props);
        this.props.initIngredients();
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return  sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState( {purchasing: true })
        } else {
            console.log('BurgerBuilder.js', this.props.isAuth);
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login');
        }
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                        price={this.props.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        // if ( this.state.loading ) {
        //     orderSummary = <Spinner />;
        // }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state =>{
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        purchased:state.order.purchased,
        isAuth:state.auth.token != null
    }
} ;
const mapDispatchToProps = dispatch =>{
    return {
        addIngredient : (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredient : (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        initIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));