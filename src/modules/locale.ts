
const initialState = {
  locale: 'en',
}

//=============================================================================
//　Reducer
//=============================================================================
export const localeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOCALE_SET_LANG':
      return {
        ...state,
        locale: action.payload
      }
    default:
      return state
  }
}

//=============================================================================
//　ActionCreators
//=============================================================================

export const setLocale = (locale:string) => ({
  type: 'LOCALE_SET_LANG',
  payload: locale
})
