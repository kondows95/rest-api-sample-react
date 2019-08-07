import axios from 'axios'
import { URL_REST_ORDERS1 } from '../constants'

const initialState = {
  orderListObj: null,
  loading:false,
}

//=============================================================================
//　Reducer
//=============================================================================
export const ordersListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ORDERLIST_LOAD_FETCH':
      return {
        ...state,
        orderListObj: action.payload
      }
    case 'ORDERLIST_BEGIN_LOADING':
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
};

//=============================================================================
//　ActionCreators
//=============================================================================
export const orderListFetch = (offset:any )=> {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: 'ORDERLIST_BEGIN_LOADING'
    })
    const axRes = await axios.put(URL_REST_ORDERS1, offset);
    dispatch({
      type: 'ORDERLIST_LOAD_FETCH',
      payload: axRes.data.data
    })
  }
}

