import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Link, Button, TextField}  from '@material-ui/core'
import FormTitle from './FormTitle'

const ConfirmSignUp = React.memo(({
  authState, 
  changeAuthState,
  loading,
  error,
  email,
  confirmSignUp
}) => {
  const [form, setForm] = React.useState({email:"", password:"",confirmationCode:""})
  
  const handleChangeValue = fieldName => event => {
    const newForm = {...form}
    newForm[fieldName] =  event.target.value
    setForm(newForm)
  }
  
  const handleSubmit = event => {
    event.preventDefault()
    confirmSignUp(email, form['confirmationCode'])
  }
  
  const content = (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" mt={8}>
          <FormTitle>Confirm your email</FormTitle>
          <Box display="flex" justifyContent="center" fontWeight={600} color="error.main">
            {error}
          </Box>
          <Box width="100%" my={2}>
            <TextField
              id="confirmationCode"
              name="confirmationCode"
              label="Confirmation Code"
              onChange={handleChangeValue("confirmationCode")} 
              value={form.confirmationCode}
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
            <Link href="#" variant="body2" onClick={handleSubmit}>
              Resend code to {email}
            </Link>
          </Box>
        </Box>
      </form>
    </Container>
  )
  return (authState === 'confirmSignUp') ? content : null
})

ConfirmSignUp.propTypes = {
  authState: PropTypes.string.isRequired,
  changeAuthState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string,
  confirmSignUp: PropTypes.func.isRequired,
}

export default ConfirmSignUp
