import axios from 'axios'
import { URL_GET_ALL_CATEGORIES } from '../constants'
import format from 'string-format'

const initialState = {
  alreadyFetched: false,
  rows: []
}

//=============================================================================
//　Reducer
//=============================================================================
export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORY_SET_ALREADY_FETCHED':
      console.log('CATEGORY#CATEGORY_SET_ALREADY_FETCHED', state)
      return {
        ...state,
        alreadyFetched: true
      }
    case 'CATEGORY_FETCH_ROWS_DONE':
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
export const fetchAllCategories = () => {
  return async (dispatch, getState) => {
    
    console.log('fetchAllCategories.state', getState())
    
    if (getState().categories.alreadyFetched) {
        return
    }

    dispatch({
        type: 'CATEGORY_SET_ALREADY_FETCHED'
    })

    // const axRes = await axios.get(URL_GET_ALL_CATEGORIES)
    const url = format(URL_GET_ALL_CATEGORIES, getState().categories.rows.length)
    const axRes = await axios.get(url)
    console.log(axRes.data)
    // const axRes = {
    //   data: {
    //     data: [
    //       {id: 1, name: "categoryA"},
    //       {id: 2, name: "categoryB"},
    //       {id: 3, name: "categoryC"},
    //       {id: 4, name: "categoryD"},
    //       {id: 5, name: "categoryE"},
    //     ]
    //   }
    // }

    dispatch({
      type: 'CATEGORY_FETCH_ROWS_DONE',
      payload: axRes.data.data
    })
  }
}
