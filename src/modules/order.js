import axios from 'axios'
import { URL_REST_ORDERS } from '../constants'

const initialState = {
  postResultObj: null,
  requestParams: null,
}

//=============================================================================
//　Reducer
//=============================================================================
export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ORDERS_SET_REQUEST_PARAMS':
      return {
        ...state,
        requestParams: action.payload,
        postResultObj: null
        
      }
    case 'ORDERS_POST_DONE':
      return {
        ...state,
        requestParams: null,
        postResultObj: action.payload
      }
    default:
      return state
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================
export const setRequestParams = addressForm => {
  return(dispatch, getState) => {
    const reqParams = {...addressForm}
    reqParams.total_price = getState().cart.totalPrice
    reqParams.item_id_array = []
    reqParams.item_qty_array = []
    reqParams.item_price_array = []
    
    const cartItems = getState().cart.rows
    for (const cartItem of cartItems) {
      reqParams.item_id_array.push(cartItem.id)
      reqParams.item_qty_array.push(cartItem.quantity)
      reqParams.item_price_array.push(cartItem.price)
    }
    
    dispatch({
      type: 'ORDERS_SET_REQUEST_PARAMS',
      payload: reqParams
    })
  }
}

export const postOrder = () => {
  return async (dispatch, getState) => {
    if (!getState().auth.user) {
      return;
    }
    
    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;
   
    const auth = {
        headers: {Authorization:'Bearer ' + token } 
    }
    
    const reqParams = getState().order.requestParams
    const axRes = await axios.post(URL_REST_ORDERS, reqParams, auth)
    dispatch({
      type: 'ORDERS_POST_DONE',
      payload: axRes.data.data
    })
    dispatch({
      type: 'CART_CLEAR_CART' //modules/cart.js
    })
  }
}
