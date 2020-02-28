import React, { Component } from 'react';
// import { Button } from '@material-ui/core';
// import { Input } from '@material-ui/core';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ButtonGroup } from '@material-ui/core';
import {Button as MaterialButton} from '@material-ui/core';
import { Redirect } from 'react-router-dom';



class Auth extends Component {

    state = {
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'email',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    componentDidMount(){
        console.log('Auth.js', this.props.burgerBuilding)
        if(!this.props.burgerBuilding && this.props.authRedirectPath!== "/"){
            // console.log("hello world")
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    signUpHandler = () =>{
        this.setState({isSignUp:true});
    }
    singInHandler = () => {
        this.setState({isSignUp:false});
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement =>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        placeholder={formElement.config.placeholder}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
                ));
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if (this.props.token) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        // console.log('Auth.js ', errorMessage);
        return (
            <div className={classes.Auth} >
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                {/* <Button btnType='Danger' clicked={this.switchSwitchAuthModeHandler}>{this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}</Button> */}
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <MaterialButton disabled={!this.state.isSignUp} onClick={this.singInHandler} >Sing-in</MaterialButton>
                    <MaterialButton disabled={this.state.isSignUp} onClick={this.signUpHandler} >Sign-up</MaterialButton>
                </ButtonGroup>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token,
        burgerBuilding : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
