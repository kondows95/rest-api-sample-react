import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, AppBar, IconButton, Toolbar, Badge } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
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

const TitleBar = ({handleDrawerToggle, totalQuantity}) => {
  const classes = useStyles()
  
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
        </Box>
      </Toolbar>
    </AppBar>
  )
}

TitleBar.propTypes = {
  handleDrawerToggle: PropTypes.func,
}

TitleBar.defaultProps = {
  handleDrawerToggle: null,
}

export default TitleBar