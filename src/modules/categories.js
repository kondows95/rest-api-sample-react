//import axios from 'axios'
//import { URL_GET_ALL_CATEGORIES } from '../constants'

const initialState = {
  alreadyFetched: false,
  rows: []
}

//=============================================================================
//　Reducer
//=============================================================================
export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      }
    case 'FETCH_CATEGORIES_DONE':
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
    
    if (getState().categories.alreadyFetched) {
        return
    }

    dispatch({
        type: 'SET_ALREADY_FETCHED'
    })

    //const axRes = await axios.get(URL_GET_ALL_CATEGORIES)
    const axRes = {
      data: {
        data: [
          {id: 1, name: "categoryA"},
          {id: 2, name: "categoryB"},
          {id: 3, name: "categoryC"},
          {id: 4, name: "categoryD"},
          {id: 5, name: "categoryE"},
        ]
      }
    }

    dispatch({
      type: 'FETCH_CATEGORIES_DONE',
      payload: axRes.data.data
    })
  }
}
