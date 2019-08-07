import { connect } from 'react-redux'
import ForgotPassword from '../../components/auth/ForgotPassword'
import { changeAuthState, forgotPassword } from '../../modules/auth.ts'

export default connect(
  (state) => ({
    authState: state.auth.authState,
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  (dispatch) => ({
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    forgotPassword: (email) => dispatch(forgotPassword(email))
  })
)(ForgotPassword)
