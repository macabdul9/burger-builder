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

export const purchaseBurger = (token, orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth='+token, orderData)
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


export const fetchOrders = (token, userId) => {
  // console.log('order.js', token);
  return dispatch => {
      dispatch(fetchOrderStart());
      // const queryParams= '?auth=' + token + '&orderBy=userId&equalTo=' + userId;
      axios.get('/orders.json?auth=', token).then(res =>{
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




