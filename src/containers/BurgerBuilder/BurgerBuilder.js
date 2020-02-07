import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class BurgerBuilder extends React.Component{

    state={
        ingredients:{
            cheese:0,
            meat:0,
            salad:0,
            bacon:0,
        }
    }
    
    addCheese = () =>{
        const ingredients = this.state.ingredients;
        ingredients['cheese'] = ingredients['cheese'] + 1
        this.setState({ingredients:ingredients})
    }

    addMeat = () =>{
        const ingredients = this.state.ingredients;
        ingredients['meat'] = ingredients['meat'] + 1
        this.setState({ingredients:ingredients})
    }

    addSalad = () =>{
        const ingredients = this.state.ingredients;
        ingredients['salad'] = ingredients['salad'] + 1
        this.setState({ingredients:ingredients})
    }

    addBacon = () =>{
        const ingredients = this.state.ingredients;
        ingredients['bacon'] = ingredients['bacon'] + 1
        this.setState({ingredients:ingredients})
    }

    render(){
        const style = {
            align:'center'
        }
        return(
            <Aux>
                <Burger 
                    ingredients={this.state.ingredients} 
                    addCheese={this.addCheese}
                    addMeat={this.addMeat}
                    addSalad={this.addSalad}
                    addBacon={this.addBacon}
                />
            </Aux>
        )
    };
};

export default BurgerBuilder;