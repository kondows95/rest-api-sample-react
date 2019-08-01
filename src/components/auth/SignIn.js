import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Link, Button, Grid, TextField}  from '@material-ui/core'
import FormTitle from './FormTitle';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
  btnWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  btnProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const SignIn = ({
  authState, 
  changeAuthState,
  signIn,
  loading,
  error
}) => {
  const classes = useStyles();
  
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
          <FormTitle><FormattedMessage id="Label.SignIn" defualtMessage="Sign In" /></FormTitle>
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
              label={loading? " " : "Email Address"}
              variant="outlined"
              required
              fullWidth
            />
          </Box>
          <Box width="100%" my={2}>
            <TextField
              id="password"
              label={loading? "" : "Password"}
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
            
            <Box className={classes.btnWrapper} >
              <Button type="submit" fullWidth disabled={loading} color="primary" variant="contained">
                <FormattedMessage id="Button.SignIn" defualtMessage="Sign In" />
              </Button>
              {loading && <CircularProgress size={24} className={classes.btnProgress} />}
            </Box>
            
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
                  No account? Sign Up
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
