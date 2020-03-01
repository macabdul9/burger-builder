import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';     
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderBurgerActions from '../../../store/actions/index';
class ContactData extends Component {
    
    initializeFormInput = (elementType, type, placeholder) => {
        return  {
            elementType:elementType,
            elementConfig:{
                type:type,
                placeholder:placeholder
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        }
    }
    
    state = {

        orderForm: {
            name:this.initializeFormInput('input', 'text', 'Name'),
            street: this.initializeFormInput('input', 'text', 'Street'),
            zipCode: this.initializeFormInput('input', 'text', 'Zip Code'),
            country:this.initializeFormInput('input', 'text', 'country'),
            email: this.initializeFormInput('input', 'email', 'Email'),
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'},
                        {value:'premium', displayValue:'Premium'},
                        {value:'co-pay', displayValue:'Co-pay'},
                        {value:'nearest', displayValue:'Nearest'},
                        {value:'blah blah blah', displayValue:'Blah Blah Blah'}
                    ]
                },
                value:'fastest', //default value
                validation:{
                    required:false
                },
                valid:true
            }
        },
        isFormValid:false
    }

    checkValidityHandler(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, key) =>{ 
        // So here we have to update the value of each elements
        const updatedForm = {...this.state.orderForm};

        updatedForm[key].value = event.target.value;

        updatedForm[key].valid = this.checkValidityHandler(updatedForm[key].value, updatedForm[key].validation);
        updatedForm[key].touched=true
        
        let isFormValid = true;
        for(let key in updatedForm){
            isFormValid = updatedForm[key].valid && isFormValid;
        }

        this.setState({orderForm:updatedForm, isFormValid:isFormValid});
    }
    orderHandler = (event) =>{

        //console.log("ContactData.js", this.initialize('input', 'text', 'Name'));
        event.preventDefault();
        this.setState( { loading: true } );
        let formData = {};
        for(let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            orderData:formData,
            // userId:this.props.userId
        }
        this.props.onBurgerOrder(this.props.token, order);
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement =>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
                ))}
                <Button btnType='Success' clicked={null} disabled={!this.state.isFormValid}>ORDER NOW</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter Contact Data</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token
        // userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder : (token, orderData) => dispatch(orderBurgerActions.purchaseBurger(token, orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));