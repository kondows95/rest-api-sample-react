import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Link, Button, TextField}  from '@material-ui/core'
import FormTitle from './FormTitle'

const ForgotPasswordSubmit = React.memo(({
  authState, 
  changeAuthState,
  loading,
  error,
  email,
  forgotPasswordSubmit,
  resendSingUp
}) => {
  const [form, setForm] = React.useState({email:"", password:""})
  console.log('Reset pwd', email)
  
  const handleChangeValue = fieldName => event => {
    const newForm = {...form}
    newForm[fieldName] =  event.target.value
    setForm(newForm)
  }
  
  const handleSubmit = event => {
    event.preventDefault()
    forgotPasswordSubmit(email, form['confirmationCode'], form['password'])
  }
  
  const handleResendSignUp = event => {
    event.preventDefault();
    resendSingUp(email);
    //alert('TODO:Auth.resendSignUp(email)')
  }
  
  const handleSignIn = event => {
    event.preventDefault()
    changeAuthState('signIn');
  }
  
  
  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Please confirm your email</FormTitle>
          <Box display="flex" justifyContent="center" fontWeight={600} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
              id="confirmationCode"
              label="Confirmation Code"
              onChange={handleChangeValue("confirmationCode")} 
              value={form.confirmationCode}
              variant="outlined"
              required
              fullWidth
            />
          </Box>
          <Box width="100%" my={2}>
            <TextField
              id="password"
              label="New Password"
              type="password"
              autoComplete="new-password"
              onChange={handleChangeValue("password")}
              value={form.password}
              variant="outlined"
              required
              fullWidth
            />
          </Box>
          <Box width="100%" mt={4} mb={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Confirm
            </Button>
          </Box>
          <Box width="100%" my={2}>
            <Link href="#" variant="body2" onClick={handleResendSignUp}>
              Resend code to {email}
            </Link>
          </Box>
          <Box width="100%" my={2}>
            <Link href="#" variant="body2" onClick={handleSignIn}>
              Back to Sign in
            </Link>
          </Box>
        </Box>
      </form>
    </Container>
  )
  return (authState === 'forgotPasswordReset') ? content : null
})

ForgotPasswordSubmit.propTypes = {
  authState: PropTypes.string.isRequired,
  changeAuthState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string,
  forgotPasswordSubmit: PropTypes.func.isRequired,
}

export default ForgotPasswordSubmit
