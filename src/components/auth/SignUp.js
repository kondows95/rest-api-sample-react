import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Container, Link, TextField}  from '@material-ui/core'
import FormTitle from './FormTitle'


const SignUp = React.memo(({
  authState, 
  changeAuthState,
  signUp,
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
    signUp( form['email'], form['password'])
  }
  
  const handleSignIn = event => {
    event.preventDefault()
    changeAuthState('signIn')
  }
  
  
  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Create Account</FormTitle>
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
          <Box width="100%" my={2}>
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
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
              Create Account
            </Button>
          </Box>
          <Box width="100%" my={2}>
            <Link href="#" variant="body2" onClick={handleSignIn}>
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </form>
    </Container>
  )
  return (authState === 'signUp') ? content : null
})

SignUp.propTypes = {
  authState: PropTypes.string.isRequired,
  changeAuthState: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
}

export default SignUp
