import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Link, Button, TextField}  from '@material-ui/core'
import FormTitle from './FormTitle';

const ForgotPassword = React.memo(({
  authState, 
  changeAuthState,
  loading,
  error,
  email,
  forgotPassword
}) => {
  const [form, setForm] = React.useState({email:"", password:""})
  
  const handleChangeValue = fieldName => event => {
    const newForm = {...form}
    newForm[fieldName] =  event.target.value
    setForm(newForm)
  }
  
  const handleSubmit = event => {
    event.preventDefault()
    forgotPassword(form['email'])
  }
  
  const handleSignIn = event => {
    event.preventDefault()
    changeAuthState('signIn')
  }
  
  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Reset Your Password</FormTitle>
          <Box display="flex" justifyContent="center" fontWeight={600} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
              id="email"
              autoComplete="email"
              type="email"
              onChange={handleChangeValue("email")}
              value={form.email}
              label="Email Address"
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
              Send Code
            </Button>
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
  return (authState === 'forgotPassword') ? content : null
})

ForgotPassword.propTypes = {
  authState: PropTypes.string.isRequired,
  changeAuthState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string,
  forgotPassword: PropTypes.func.isRequired,
}

export default ForgotPassword
