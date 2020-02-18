import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        })
    }

    const ingredientsOut = ingredients.map(ig => {
    return <span 
            key={ig.name} 
            style={{textTransform:'capitalize',
                    border:'2px solid #ccc',
                    margin:'0 5px',
                    display:'inline-block',
                    padding:'2px' }}
            >{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients  : {ingredientsOut}</p>
            <p>Price : <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order;