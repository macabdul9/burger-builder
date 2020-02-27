import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders';

export const purchaseInit = () => {
  return {
      type: actionTypes.PURCHASE_INIT
  };
};
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

<<<<<<< HEAD
export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
};

export const fetchOrder = () => {
  return {
    
  }
}
=======
>>>>>>> with-redux

export const fetchOrderStart = () => {
  return {
    type:actionTypes.FETCH_ORDER_START,
    
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


export const fetchOrders = () => {
  return dispatch => {
      dispatch(fetchOrderStart());
      axios.get('/orders.json').then(res =>{
        let orders = [];
        for(let key in res.data){
            orders.push({
                ...res.data[key],
                  id:key});
        }
        dispatch(fetchOrderSuccess(orders));
        }).catch(error=>{
            dispatch(fetchOrderFail(error));
        });
  }
}




