
const initialState = {
  locale: 'ja',
}

//=============================================================================
//　Reducer
//=============================================================================
export const localeReducer = (state = initialState, action) => {
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

export const setLocale = locale => ({
  type: 'LOCALE_SET_LANG',
  payload: locale
})
