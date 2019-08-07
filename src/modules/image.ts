import { Storage } from 'aws-amplify';

const initialState = {
  requestParams: null,
  error: null,
  loading: false,
}

//=============================================================================
//　Reducers
//=============================================================================
export const imageReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'IMAGE_UPLOAD_SUCCESS':
      return {
        ..._getCommonState(state),
        requestParams: action.payload
      }
    case 'IMAGE_INIT':
      return {
        ...initialState
      }
    default:
      return state
  }
}

const _getCommonState = (state : any) => ({
  ...state, 
  error: null,
  loading: false,
})

//=============================================================================
//　ActionCreators
//=============================================================================

export const setRequestParams = () => {
  
  return(dispatch: any, getState: any) => {
    dispatch({
      type: 'IMAGE_INIT'
    })
  }
  
}

//'image/png'
export const uploadImage = (fileName: any, fileData: any, contentType: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: 'IMAGE_BEGIN_LOADING'
    })
    
    try {
      const res = await Storage.put(fileName, fileData, {
          contentType: contentType
      })
      dispatch({
        type: 'IMAGE_UPLOAD_SUCCESS',
        payload: res
      })
    }
    catch(err) {
      dispatch({
        type: 'IMAGE_INIT',
      })
    }
  }
}
