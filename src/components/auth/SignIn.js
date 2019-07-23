import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Link, Button, Grid, TextField}  from '@material-ui/core'
import FormTitle from './FormTitle'

const SignIn = ({
  authState, 
  changeAuthState,
  signIn,
  loading,
  error
}) => {
  
  const [form, setForm] = React.useState({email:"", password:""})
  
  const handleChangeValue = fieldName => event => {
    const newForm = {...form}
    newForm[fieldName] =  event.target.value
    setForm(newForm)
  }
  
  const handleSubmit = event => {
    event.preventDefault()
    signIn(form['email'], form['password'])
  }
  
  const handleForgotPassword = event => {
    event.preventDefault()
    changeAuthState('forgotPassword')
  }
  
  const handleSignUp = event => {
    event.preventDefault()
    changeAuthState('signUp')
  }
  
  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Sign In</FormTitle>
          <Box display="flex" justifyContent="center" fontWeight={600} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
              id="email"
              autoComplete="email"
              type="email"
              onChange={handleChangeValue('email')}
              value={form.email}
              label="Email Address"
              variant="outlined"
              required
              fullWidth
            />
          </Box>
          <Box width="100%" my={2}>
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChangeValue('password')} 
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
              Sign In
            </Button>
          </Box>
          <Box width="100%" my={2}>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={handleForgotPassword}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSignUp}>
                  No account? Create account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </Container>
  )
  return (authState === 'signIn') ? content : null
}

SignIn.propTypes = {
  authState: PropTypes.string.isRequired,
  changeAuthState: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired
}

export default SignIn
