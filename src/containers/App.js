import { connect } from 'react-redux'
import App from '../components/App'
import { fetchAllCategories } from '../modules/categories.ts'
import { fetchCartData } from '../modules/cart.ts'
import { fetchAuthedUser, refreshToken } from '../modules/auth.ts'

export default connect(
  (state) => ({
    authState: state.auth.authState,
    dialogOpened: state.auth.dialogOpened,
    user: state.auth.user,
    loading: state.auth.loading,
    locale: state.locale.locale
  }),
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchCartData: () => dispatch(fetchCartData()),
    fetchAuthedUser: () => dispatch(fetchAuthedUser()),
    refreshToken: () => dispatch( refreshToken() )
    
  })
)(App)
