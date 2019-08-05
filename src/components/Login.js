import React from 'react';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { withRouter } from 'react-router-dom'

import SignIn from '../containers/auth/SignIn'
import SignUp from '../containers/auth/SignUp'
import ConfirmSignUp from '../containers/auth/ConfirmSignUp'
import ForgotPassword from '../containers/auth/ForgotPassword'
import ForgotPasswordSubmit from '../containers/auth/ForgotPasswordSubmit'

import Testing from './Testing';
import Federated from './Federated';

const Login = ({ handleDrawerToggle, totalQuantity, authState, changeAuthState, fetchAuthedUser, signOut, user, loading, history }) => {

  const isFirstRef = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAuthedUser()
    }
  })
  const handleItem = event => {
    event.preventDefault();
    history.push("/items");
  }

  const auth = (
    <React.Fragment>
      <SignIn />
      <SignUp />
      <ConfirmSignUp />
      <ForgotPassword />
      <ForgotPasswordSubmit />
    </React.Fragment>
  )
  const button = user ? (
    <Box mt={10}>
      <h1>SUCCESSFUL SIGN IN</h1>
      <h1>Tap To Shopping</h1>
      <Button variant="contained" color="primary" onClick={handleItem}>
        SHOPPING
      </Button>
    </Box>
  ) : (
      <Box mt={10} >
        <h1>Tap To Login</h1>
        <Button variant="contained" disabled={loading} color="primary" onClick={() => {
          changeAuthState('signIn')
        }}>
          SIGN IN
      </Button>
      </Box>
    )
  const contents = authState ? auth : <Box m={2}>{button}</Box>
  return (
    <Box flexGrow={1} textAlign="center" >
      {/* {contents} */}
      <Testing />
    </Box>
  )
}
export default withRouter(Login);
