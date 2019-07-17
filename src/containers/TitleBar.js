import { connect } from 'react-redux'
import TitleBar from '../components/TitleBar'
import { fetchAuthedUser, changeAuthState, signOut } from '../modules/auth'

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
    signOut: () => dispatch(signOut()),
  })
)(TitleBar)
