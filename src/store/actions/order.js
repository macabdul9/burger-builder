import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData)
            .then( response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
        } );
    }
};

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
};

export const fetchOrderr = () => {
  return {
    
  }
}

export const fetchOrderStart = () => {
  return {
    type:actionTypes.fetchOrderStart,
    
  } 
};

export const fetchOrderSuccess = (orders) => {
  return {
    type:actionTypes.FETCH_ORDER_SUCCESS,
    orders:orders
  }
};
export const fetchOrderFail = (error) => {
  return {
    type:actionTypes.FETCH_ORDER_FAIL,
    error:error
  }
};




