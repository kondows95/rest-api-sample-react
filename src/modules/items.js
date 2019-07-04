import axios from 'axios'
import { URL_GET_ALL_ITEMS, URL_UPDATE_ITEM } from '../constants'
import format from 'string-format'
import { updateDbRows } from '../util'

const initialState = {
  alreadyFetched: false,
  rows: [],
  error: "",
}

//=============================================================================
//　Reducer
//=============================================================================
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEM_SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      }
    case 'ITEM_FETCH_ROWS_DONE':
      return {
        ...state,
        rows: action.payload
      }
    case 'ITEM_STORE_DONE':
      return {
        ...state,
        rows: updateDbRows(state.rows, action.payload)
      }
    default:
      return state
  }
}


//=============================================================================
//　ActionCreators
//=============================================================================

export const updateItem = (id, item) => {
  return async (dispatch, getState) => {
    const obj = {
      name: item.name,
      price: item.price,
      category_id: item.category_id,
    }
    
    const url = format(URL_UPDATE_ITEM, id)
    const axRes = await axios.put(url, obj)
    
    dispatch({
      type: 'ITEM_STORE_DONE',
      payload: axRes.data.data
    })
  }
}

export const fetchAllItems = () => {
  return async (dispatch, getState) => {
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
