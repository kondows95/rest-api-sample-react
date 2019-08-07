import { connect } from 'react-redux'
import Login from '../components/Login'
import { fetchAuthedUser, changeAuthState, signOut } from '../modules/auth.ts';

export default connect(
  (state) => ({
    totalQuantity:  state.cart.totalQuantity,
    authState: state.auth.authState,
    dialogOpened: state.auth.dialogOpened,
    user: state.auth.user,
    loading: state.auth.loading
    
  }),
  (dispatch) => ({
    fetchAuthedUser: () => dispatch(fetchAuthedUser()),
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    signOut: () => dispatch(signOut())
  })
)(Login)
