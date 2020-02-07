import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_, i) =>{
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    }).reduce((arr, el)=>{
        return arr.concat(el)
    }, []);
    if(transformedIngredients.length==0){
        transformedIngredients = <p>Please start adding ingredients !</p>
    }
    console.log(transformedIngredients)
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
            {/* <h1>Add Ingredients</h1> */}
            <ButtonGroup name = 'Cheese' variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={props.addCheese}>Cheese</Button>
                <Button onClick={props.addMeat}>Meat</Button>
                <Button onClick={props.addSalad}>Salad</Button>
                <Button onClick={props.addBacon}>Bacon</Button>
            </ButtonGroup>   
                        
        </div>
    )
};

export default burger;