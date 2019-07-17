import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, AppBar, IconButton, Toolbar, Badge, Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { 
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon 
} from '@material-ui/icons';

import SignIn from '../containers/auth/SignIn'
import SignUp from '../containers/auth/SignUp'
import ConfirmSignUp from '../containers/auth/ConfirmSignUp'
import ForgotPassword from '../containers/auth/ForgotPassword'
import ForgotPasswordSubmit from '../containers/auth/ForgotPasswordSubmit'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rightIcon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  }
}));

const TitleBar = ({handleDrawerToggle, totalQuantity, authState, changeAuthState, fetchAuthedUser, signOut, user, loading}) => {
  const classes = useStyles()

  
  const button = user ? (
    <Box mt={1}>
      <Button variant="contained" disabled={loading} color="secondary" onClick={() => {
        signOut()
      }}>
        SIGN OUT
      </Button>
    </Box>
  ) : (
    <Box mt={1}>
      <Button to="/login" component={RouterLink}  variant="contained"  color="primary">
        SIGN IN
      </Button>
    </Box>
  )
  
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          disabled={(handleDrawerToggle === null)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1} fontSize="h6.fontSize">Sample</Box>
        <Box mr={0} ml="auto">
            
            <Grid container>
              {button}
              
              <IconButton
                color="inherit"
                to="/cart"
                component={RouterLink}
               >
                <Badge 
                  color="secondary" 
                  badgeContent={totalQuantity} 
                  invisible={totalQuantity > 0 ? false: true} 
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

TitleBar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  authState: PropTypes.string,
  changeAuthState: PropTypes.func.isRequired,
  fetchAuthedUser: PropTypes.func.isRequired
}

TitleBar.defaultProps = {
  handleDrawerToggle: null,
}

export default TitleBar