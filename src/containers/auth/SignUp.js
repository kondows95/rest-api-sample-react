import { connect } from 'react-redux'
import SignUp from '../../components/auth/SignUp'
import { changeAuthState, signUp } from '../../modules/auth'

export default connect(
  (state) => ({
    authState: state.auth.authState,
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  (dispatch) => ({
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    signUp: (email, password) => dispatch(signUp(email, password))
  })
)(SignUp)
