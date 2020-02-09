import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends React.Component {

    state = {
        sideDrawerVisible:false
    }
    // sideDrawerCloseHandler =(props)=>{
    //     this.setState({sideDrawerVisible:false})
    // }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerVisible:!prevState.sideDrawerVisible};
        }
        )
    }
    
    render() {
        return (
            <Aux>
                <Toolbar toggle={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer
                open={this.state.sideDrawerVisible}
                closed={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
