import axios from 'axios'
import { URL_REST_CATEGORIES, URL_REST_ORDERS } from '../constants'
import { replaceRowInRows, deleteRowFromRows } from '../util'

const initialState = {
  alreadyFetched: false,
  rows: [],
}

//=============================================================================
//　Reducer
//=============================================================================
export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORY_SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      }
    case 'CATEGORY_FETCH_ROWS_DONE':
      return {
        ...state,
        rows: action.payload
      }
    case 'CATEGORY_POST_DONE':
      return {
        ...state,
        rows: [...state.rows, action.payload]
      }
    case 'CATEGORY_PUT_DONE':
      return {
        ...state,
        rows: replaceRowInRows(state.rows, action.payload)
      }
    case 'CATEGORY_DELETE_DONE':
      return {
        ...state,
        rows: deleteRowFromRows(state.rows, action.payload)
      }
    case 'CATEGORY_TEST_POST':
      return {...state}
    default:
      return state
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================
export const fetchAllCategories = () => {
  return async (dispatch, getState) => {
    if (getState().categories.alreadyFetched) {
        return
    }

    dispatch({
        type: 'CATEGORY_SET_ALREADY_FETCHED'
    })

    const axRes = await axios.get(URL_REST_CATEGORIES)

    dispatch({
      type: 'CATEGORY_FETCH_ROWS_DONE',
      payload: axRes.data.data
    })
  }
}

export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    const url = URL_REST_CATEGORIES + '/' + id
    await axios.delete(url)
    dispatch({
      type: 'CATEGORY_DELETE_DONE',
      payload: id
    })
  }
}

export const saveCategory= (category) => {
  return async (dispatch, getState) => {
    const id = category.id ? category.id : null
    const reqParams = {
      name: category.name
    }
    
    if (id === null) {
      //INSERT
      const axRes = await axios.post(URL_REST_CATEGORIES, reqParams)
      dispatch({
        type: 'CATEGORY_POST_DONE',
        payload: axRes.data.data
      })
    }
    else {
      //UPDATE
      const url = URL_REST_CATEGORIES + '/' + id
      const axRes = await axios.put(url, reqParams)
      dispatch({
        type: 'CATEGORY_PUT_DONE',
        payload: axRes.data.data
      })
    }
  }
}

export const testPost = () => {
  return async (dispatch, getState) => {
    const reqParams = {
      first_name: 'Kondo',
      last_name: 'Tsubasa',
      //items: [{id:1, qty:2},{id:2, qty:3}]
    }
    
    const axRes = await axios.post(URL_REST_ORDERS, reqParams)
    console.log('###testPost', axRes.data)
    dispatch({
      type: 'CATEGORY_TEST_POST'
    })
  }
}