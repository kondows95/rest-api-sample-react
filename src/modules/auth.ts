import { Auth } from 'aws-amplify';

const initialState = {
  authState: 'signIn',
  user: null,
  email: null,
  error: null,
  loading: false,
}


//=============================================================================
//　Reducers
//=============================================================================
export const authReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'AUTH_SYSTEM_ERROR':
      return {
        ..._getCommonState(state),
        error: action.payload,
        loading: false
      }
    case 'AUTH_BEGIN_LOADING':
      return {
        ..._getCommonState(state),
        loading: true
      }
    case 'AUTH_INIT':
      return {
        ...initialState
      }
    case 'AUTH_CHANGE_AUTH_STATE':
      return {
        ..._getCommonState(state),
        authState: action.payload
      }
    case 'AUTH_FETCH_AUTHED_USER':
      return {
        ..._getCommonState(state),
        user: action.payload
      }
    case 'AUTH_SIGN_IN_SUCCESS':
      return {
        ..._getCommonState(state),
        user: action.payload,
        authState: null,
      }
    case 'AUTH_SIGN_UP_SUCCESS':
      return {
        ..._getCommonState(state),
        authState: 'confirmSignUp',
        email: action.payload,
      }
    case 'AUTH_FORGOT_PASSWORD_SUCCESS':
      return {
        ..._getCommonState(state),
        //authState: 'forgotPasswordSubmit'
        authState: 'forgotPasswordReset',
        email: action.payload
      }
    default:
      return state
  }
}

const _getCommonState = (state: any) => ({
  ...state, 
  error: null,
  loading: false,
})

//=============================================================================
//　ActionCreators
//=============================================================================

export const refreshToken = () => {
  return async (dispatch: any , getState: any) => {
    
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      cognitoUser.refreshSession(currentSession.getRefreshToken, (err:any, session:any) => {
        console.log('session', err, session);
        //const { idToken, refreshToken, accessToken } = session;
        // do whatever you want to do now :)
      });
    } catch (e) {
      console.log('Unable to refresh Token', e);
    }
    
  }
}

export const changeAuthState = (value:String) =>  ({
  type: 'AUTH_CHANGE_AUTH_STATE',
  payload: value
})

export const fetchAuthedUser = () => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_BEGIN_LOADING'
    })
    try {
      const user = await Auth.currentAuthenticatedUser()
      dispatch({
        type: 'AUTH_FETCH_AUTHED_USER',
        payload: user
      })
    }
    catch(err) {
      dispatch({
        type: 'AUTH_INIT',
      })
    }
  }
}

export const signOut = () => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_INIT',
    })
  
    try {
      await Auth.signOut()
    }
    catch(err) {
      dispatch({
        type: 'AUTH_SYSTEM_ERROR',
        payload: err.message || err
      })
    }
  }
}

export const signIn = (email:string, password:string) => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_BEGIN_LOADING'
    })
    
    try {
      const user = await Auth.signIn(email, password)
      console.log(user);
      dispatch({
        type: 'AUTH_SIGN_IN_SUCCESS',
        payload: user
      })
    }
    catch(err) {
      dispatch({
        type: 'AUTH_SYSTEM_ERROR',
        payload: err.message || err
      })
    }
  }
}

export const signUp = (email:string, password:string) => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_BEGIN_LOADING'
    })
    
    try {
      await Auth.signUp(email, password)
      dispatch({
        type: 'AUTH_SIGN_UP_SUCCESS',
        payload: email
      })
    }
    catch(err) {
      dispatch({
        type: 'AUTH_SYSTEM_ERROR',
        payload: err.message || err
      })
    }
  }
}

export const confirmSignUp = (email:string, code:string) => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_BEGIN_LOADING'
    })
    
    try {
      await Auth.confirmSignUp(email, code)
      dispatch({
        type: 'AUTH_INIT',
      })
    }
    catch(err) {
      dispatch({
        type: 'AUTH_SYSTEM_ERROR',
        payload: err.message || err
      })
    }
  }
}


export const resendSingUp = (email:string) => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_BEGIN_LOADING'
    })
    
    try {
      await Auth.resendSignUp(email)
    }
    catch(err) {
      dispatch({
        type: 'AUTH_SYSTEM_ERROR',
        payload: err.message || err
      })
    }
  }
}

export const forgotPassword = (email:string) => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_BEGIN_LOADING'
    })
    
    try {
      await Auth.forgotPassword(email)
      dispatch({
        type: 'AUTH_FORGOT_PASSWORD_SUCCESS',
        payload: email
      })
    }
    catch(err) {
      dispatch({
        type: 'AUTH_SYSTEM_ERROR',
        payload: err.message || err
      })
    }
  }
}

export const forgotPasswordSubmit = (email:string, code:string, password:string) => {
  return async (dispatch:any, getState:any) => {
    dispatch({
      type: 'AUTH_BEGIN_LOADING'
    })
    
    try {
      await Auth.forgotPasswordSubmit(email, code, password)
      dispatch({
        type: 'AUTH_INIT',
      })
    }
    catch(err) {
      dispatch({
        type: 'AUTH_SYSTEM_ERROR',
        payload: err.message || err
      })
    }
  }
}

