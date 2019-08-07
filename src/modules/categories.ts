import axios from 'axios';
import { URL_REST_CATEGORIES } from '../constants';
import { replaceRowInRows, deleteRowFromRows } from '../util';

const initialState = {
  alreadyFetched: false,
  rows: [],
  loading:false,
  closeDialog:false
}

//=============================================================================
//　Reducer
//=============================================================================
export const categoriesReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'CATEGORY_SET_ALREADY_FETCHED':
      return {
        ...state,
        alreadyFetched: true
      }
    case 'CATEGORY_FETCH_ROWS_DONE':
      return {
        ...__commonState(state),
        rows: action.payload
      }
    case 'CATEGORY_POST_DONE':
      return {
        ...__commonState(state),
        rows: [...state.rows, action.payload]
      }
    case 'CATEGORY_PUT_DONE':
      return {
        ...__commonState(state),
        rows: replaceRowInRows(state.rows, action.payload)
      }
    case 'CATEGORY_DELETE_DONE':
      return {
        ...__commonState(state),
        rows: deleteRowFromRows(state.rows, action.payload)
      }
    case 'CATEGORY_TEST_POST':
      return { ...state }
    case 'CATEGORY_BEGIN_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'CATEGORY_SET_DIALOG':
      return {
        ...state,
        closeDialog: action.payload
      }
    default:
      return state
  }
}

const __commonState = (state:any) => {
  const newState = { ...state };
  newState.loading = false;
  newState.closeDialog = false;
  return newState
}
//=============================================================================
//　ActionCreators
//=============================================================================
export const fetchAllCategories = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: 'CATEGORY_BEGIN_LOADING'
    })
    if (!getState().auth.user) {
      return;
    }

    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;

    const auth = {
      headers: { Authorization: 'Bearer ' + token }
    }

    if (getState().categories.alreadyFetched) {
      return
    }
    dispatch({
      type: 'CATEGORY_SET_ALREADY_FETCHED'
    })

    const axRes = await axios.get(URL_REST_CATEGORIES, auth)
    dispatch({
      type: 'CATEGORY_FETCH_ROWS_DONE',
      payload: axRes.data.data
    })
  }
}

export const deleteCategory = (id:number) => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: 'CATEGORY_BEGIN_LOADING'
    })
    if (!getState().auth.user) {
      return;
    }

    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;

    const auth = {
      headers: { Authorization: 'Bearer ' + token }
    }

    const url = URL_REST_CATEGORIES + '/' + id
    await axios.delete(url, auth)
    dispatch({
      type: 'CATEGORY_DELETE_DONE',
      payload: id
    })
  }
}

export const saveCategory = (category:any) => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: 'CATEGORY_BEGIN_LOADING'
    })
    if (!getState().auth.user) {
      return;
    }

    const token = getState().auth.user.signInUserSession.accessToken.jwtToken;

    const auth = {
      headers: { Authorization: 'Bearer ' + token }
    }

    const id = category.id ? category.id : null
    const reqParams = {
      name: category.name
    }

    if (id === null) {
      //INSERT
      const axRes = await axios.post(URL_REST_CATEGORIES, reqParams, auth)
      dispatch({
        type: 'CATEGORY_POST_DONE',
        payload: axRes.data.data
      })
    }
    else {
      //UPDATE
      const url = URL_REST_CATEGORIES + '/' + id
      const axRes = await axios.put(url, reqParams, auth)
      dispatch({
        type: 'CATEGORY_PUT_DONE',
        payload: axRes.data.data
      })
    }
  }
}

export const dialogBox = (value : boolean) => ({
  type: 'CATEGORY_SET_DIALOG',
  payload: value
})




