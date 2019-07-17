import { connect } from 'react-redux'
import App from '../components/App'
import { fetchAllCategories } from '../modules/categories'
import { fetchCartData } from '../modules/cart'
import { fetchAuthedUser, changeAuthState, signOut } from '../modules/auth'

export default connect(
  (state) => ({
    authState: state.auth.authState,
    dialogOpened: state.auth.dialogOpened,
    user: state.auth.user,
    loading: state.auth.loading
  }),
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchCartData: () => dispatch(fetchCartData()),
    fetchAuthedUser: () => dispatch(fetchAuthedUser()),
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    signOut: () => dispatch(signOut()),
  })
)(App)
