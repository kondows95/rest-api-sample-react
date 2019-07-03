//import axios from 'axios'
//import { URL_GET_ALL_CUSTOMERS } from '../constants'

const initialState = {
  alreadyFetched: false,
  rows: []
}

//=============================================================================
//　Reducer
//=============================================================================
export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      }
    case 'FETCH_CUSTOMERS_DONE':
      return {
        ...state,
        rows: action.payload
      }
    default:
      return state
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================
export const fetchAllCustomers = () => {
  return async (dispatch, getState) => {
    
    if (getState().customers.alreadyFetched) {
        return
    }

    dispatch({
        type: 'SET_ALREADY_FETCHED'
    })

    //const axRes = await axios.get(URL_GET_ALL_CUSTOMERS)
    const axRes = {
      data: {
        data: [
          {id: 1, name: "Mg Mg",phone: "09786540223",address:"Mandalay"},
          {id: 2, name: "Aung Aung", phone:"09204604437",address:"Yangon"},
        ]
      }
    }

    dispatch({
      type: 'FETCH_CUSTOMERS_DONE',
      payload: axRes.data.data
    })
  }
}
