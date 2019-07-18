import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, AppBar, IconButton, Toolbar, Badge, Button } from '@material-ui/core'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { 
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon 
} from '@material-ui/icons';

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

const TitleBar = ({handleDrawerToggle, totalQuantity, changeAuthState, fetchAuthedUser, signOut, user, history}) => {
  const classes = useStyles();
  
  const isFirstRef = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAuthedUser()
    }
  })

  const handleLogin = event => {
    event.preventDefault();
    changeAuthState('signIn');
    history.push("/login");
  }
  
  const handleLogout = event => {
    event.preventDefault();
    signOut();
  }

  
  const button = user ? (
    <Box mt={1} mr={2}>
      <Button onClick={handleLogout} variant="contained" color="secondary">
        SIGN OUT
      </Button>
    </Box>
  ) : (
    <Box mt={1} mr={2}>
      <Button onClick={handleLogin}  variant="contained"  color="primary">
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
  changeAuthState: PropTypes.func.isRequired,
  fetchAuthedUser: PropTypes.func.isRequired
}

TitleBar.defaultProps = {
  handleDrawerToggle: null,
}

export default withRouter(TitleBar);