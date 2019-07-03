import axios from 'axios'
import { URL_GET_ALL_ITEMS } from '../constants'
import format from 'string-format'

const initialState = {
  alreadyFetched: false,
  rows: []
}

//=============================================================================
//　Reducer
//=============================================================================
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_SET_ALREADY_FETCHED':
      console.log('ITEM#ITEM_SET_ALREADY_FETCHED', state)
      return {
        ...state,
        alreadyFetched: true
      }
    case 'ITEM_FETCH_ROWS_DONE':
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
export const fetchAllItems = () => {
  return async (dispatch, getState) => {
    
    console.log('fetchAllItems.state', getState())
    
    if (getState().items.alreadyFetched) {
      return
    }
    
    dispatch({
      type: 'ITEM_SET_ALREADY_FETCHED'
    })
    
    const url = format(URL_GET_ALL_ITEMS, getState().items.rows.length)
    const axRes = await axios.get(url)
    

    dispatch({
      type: 'ITEM_FETCH_ROWS_DONE',
      payload: axRes.data.data
    })
  }
}
