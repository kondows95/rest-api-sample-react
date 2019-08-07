import { connect } from 'react-redux'
import SignIn from '../../components/auth/SignIn'
import { changeAuthState, signIn } from '../../modules/auth.ts'

export default connect(
  (state) => ({
    authState: state.auth.authState,
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  (dispatch) => ({
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    signIn: (email, password) => dispatch(signIn(email, password))
  })
)(SignIn)
