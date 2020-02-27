import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    orders : [],
    loading:false,
    purchased:false
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased:false}); 
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading:true});
}
const purchaseBurgerSuccess = (state, action) => {
    return updateObject(state, {
        loading:false,
        orders:state.orders.concat(updateObject(action.orderData, {id:action.id})),
        purchased:true

    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading:false});
        case actionTypes.FETCH_ORDER_START: return updateObject(state, {loading:true});
        case actionTypes.FETCH_ORDER_SUCCESS: return updateObject(state, {loading:false, orders:action.orders});
        case actionTypes.FETCH_ORDER_FAIL: return updateObject(state, {loading:false});
        default: return state;
    }
}

export default reducer;