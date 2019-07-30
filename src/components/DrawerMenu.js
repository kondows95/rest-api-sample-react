import React from 'react'
import PropTypes from 'prop-types'
import { Drawer, Divider } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuList from './MenuList'
import ToolbarSpacer from './ToolbarSpacer'

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(1),
    },
    zIndex: 99
  },
}));

const DrawerMenu = ({mobileOpen, handleDrawerClose}) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <ToolbarSpacer />
          <MenuList handleDrawerClose={handleDrawerClose} />
        </Drawer> 
      </Hidden>
    </nav>
  )
}

DrawerMenu.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
}

export default DrawerMenu