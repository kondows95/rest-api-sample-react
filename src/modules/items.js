import axios from 'axios'
import { URL_REST_ITEMS } from '../constants'
import { replaceRowInRows, deleteRowFromRows } from '../util'

const initialState = {
  alreadyFetched: false,
  rows: [],
  error: "",
  selectedCateogryId: null,
  noMoreFetch: false,
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
        rows: [...state.rows, ...action.payload]
      }
    case 'ITEM_POST_DONE':
      return {
        ...state,
        rows: [...state.rows, action.payload]
      }
    case 'ITEM_PUT_DONE':
      return {
        ...state,
        rows: replaceRowInRows(state.rows, action.payload)
      }
    case 'ITEM_DELETE_DONE':
      return {
        ...state,
        rows: deleteRowFromRows(state.rows, action.payload)
      }
    case 'ITEM_SET_CATEGORY_ID':
      return {
        ...state,
        selectedCateogryId: action.payload
      }
    case 'ITEM_NO_MORE_FETCH':
      return {
        ...state,
        noMoreFetch: true
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
        
    const url = URL_REST_ITEMS + '?offset=' + getState().items.rows.length
    console.log('fetchAllItems', url)
    const axRes = await axios.get(url)
    
    if (axRes.data.data.length === 0) {
      dispatch({
        type: 'ITEM_NO_MORE_FETCH'
      })
    }

    dispatch({
      type: 'ITEM_FETCH_ROWS_DONE',
      payload: axRes.data.data
    })
  }
}

export const deleteItem = (id) => {
  return async (dispatch, getState) => {
    const url = URL_REST_ITEMS + '/' + id
    await axios.delete(url)
    dispatch({
      type: 'ITEM_DELETE_DONE',
      payload: id
    })
  }
}

export const saveItem= (item) => {
  return async (dispatch, getState) => {
    const id = item.id ? item.id : null
    const reqParams = {
      name: item.name,
      price: item.price,
      category_id: item.category_id,
      image: item.image,
    }
    
    if (id === null) {
      //INSERT
      const axRes = await axios.post(URL_REST_ITEMS, reqParams)
      dispatch({
        type: 'ITEM_POST_DONE',
        payload: axRes.data.data
      })
    }
    else {
      //UPDATE
      const url = URL_REST_ITEMS + '/' + id
      const axRes = await axios.put(url, reqParams)
      dispatch({
        type: 'ITEM_PUT_DONE',
        payload: axRes.data.data
      })
    }
  }
}

export const setCategoryId = categoryId => ({
  type: 'ITEM_SET_CATEGORY_ID',
  payload: categoryId
})