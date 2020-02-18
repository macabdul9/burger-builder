import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler = (event) =>{
        //
        event.preventDefault();
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            customer: {
                name: 'Abdul Waheed',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest',
        }
        axios.post( '/orders.json', order)
            .then( response => {
                this.setState( { loading: false} );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false} );
            } );
    }
    render() {
        let form = (
            <form>
                <input className= {classes.Input} type='email' name='email' placeholder='Email'/>
                <input className= {classes.Input} type='text' name='street' placeholder='Street Name'/>
                <input className= {classes.Input} type='text' name='name' placeholder='Name'/>
                <input className= {classes.Input} type='text' name='postalCode' placeholder='Postal Code'/>
                <Button btnType='Success' clicked = {this.orderHandler}>ORDER NOW</Button>
            </form>
        );
        if(this.state.loading){
            form = (<Spinner/>);
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter Contact Data</h3>
                {form}
            </div>
        )
    }
}

export default ContactData;