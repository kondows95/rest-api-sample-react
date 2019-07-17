import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

import SignIn from '../containers/auth/SignIn'
import SignUp from '../containers/auth/SignUp'
import ConfirmSignUp from '../containers/auth/ConfirmSignUp'
import ForgotPassword from '../containers/auth/ForgotPassword'
import ForgotPasswordSubmit from '../containers/auth/ForgotPasswordSubmit'

const Login = ({handleDrawerToggle, totalQuantity, authState, changeAuthState, fetchAuthedUser, signOut, user, loading}) => {
  
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
    <Box>
      <Button variant="contained" disabled={loading} color="secondary" onClick={() => {
        signOut()
      }}>
        SIGN OUT
      </Button>
    </Box>
  ) : (
    <Box>
      <Button variant="contained" disabled={loading} color="primary" onClick={() => {
        changeAuthState('signIn')
      }}>
        SIGN IN
      </Button>
    </Box>
  )
  
  const contents = authState ? auth : <Box m={2}>{button}</Box>
  
  return (
    <Box display="flex" flexDirection="column" textAlign="center" >
      <h1>Login Page..</h1>
      
      {contents}
    </Box>  
  )
}
export default Login;
