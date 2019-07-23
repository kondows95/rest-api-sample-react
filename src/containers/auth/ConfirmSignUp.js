import { connect } from 'react-redux'
import ConfirmSignUp from '../../components/auth/ConfirmSignUp'
import { changeAuthState, confirmSignUp } from '../../modules/auth'

export default connect(
  (state) => ({
    authState: state.auth.authState,
    loading: state.auth.loading,
    error: state.auth.error,
    email: state.auth.email,
  }),
  (dispatch) => ({
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    confirmSignUp: (email, code) => dispatch(confirmSignUp(email, code)),
  })
)(ConfirmSignUp)
