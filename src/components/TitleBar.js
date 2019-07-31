import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { Grid, Box, AppBar, IconButton, Toolbar, Badge, Menu, MenuItem, Divider, ListItemIcon, ListItemText  } from '@material-ui/core'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { 
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountBalanceWallet as LogoutIcon
} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    zIndex: 999
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
  },
  imgIcon: {
    width: 30,
    height: 30,
    borderRadius: '100%'
  },
  selected: {
    background: '#e9e9ef'
  }
}));

const ITEM_HEIGHT = 60;

const TitleBar = ({locale, setLocale,handleDrawerToggle, totalQuantity, changeAuthState, fetchAuthedUser, signOut, user, history}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
  
  const handleLocale = (event, locale) => {
    event.preventDefault();
    setLocale(locale);
    setAnchorEl(null);
  }
  
  const isFirstRef = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAuthedUser()
    }
  })

  const handleLogout = event => {
    event.preventDefault();
    signOut();
  }

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
        <Box flexGrow={1} fontSize="h6.fontSize">
          <FormattedMessage id="Top.Title" defualtMessage="Title" />
        </Box>
        <Box mr={0} ml="auto">
          <Grid container>
            <RouterLink to="/cart" style={{ color: "white"}}>
              <IconButton
                color="inherit"
              >
                <Badge
                  color="secondary"
                  badgeContent={totalQuantity}
                  invisible={totalQuantity > 0 ? false : true}>
                  <ShoppingCartIcon className="fa-shopping-cart" />
                </Badge>
              </IconButton>
            </RouterLink>
          
              <IconButton
                color="inherit"
                aria-label="More"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
               >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                keepMounted={false}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                
                <MenuItem disabled={true} >
                  <FormattedMessage id="Menu.Title" defualtMessage="Change Language" />
                </MenuItem>
                
                <Divider /> 
                
                <MenuItem className={ locale === 'ja' ? classes.selected : null }  onClick={event => handleLocale(event, 'ja')}>
                  <ListItemIcon>
                    <img src="https://cdn2.iconfinder.com/data/icons/world-flags-1-1/100/Japan-512.png" className={classes.imgIcon} alt='Japanese' />
                  </ListItemIcon>
                  <ListItemText> <FormattedMessage id="Menu.Japanese" defualtMessage="Japanese" /> </ListItemText>
                </MenuItem>
                
                <MenuItem className={ locale === 'en' ? classes.selected : null } onClick={event => handleLocale(event, 'en')}>
                  <ListItemIcon>
                    <img src="https://cdn3.iconfinder.com/data/icons/world-flags-circular-1/512/49-Great_Britain_United_Kingdom_UK_England_Union_Jack_country_flag_-512.png" className={classes.imgIcon} alt='English' />
                  </ListItemIcon>
                  <ListItemText> <FormattedMessage id="Menu.English" defualtMessage="English" /> </ListItemText>
                </MenuItem>
                
                <Divider />
                
                <MenuItem  onClick={handleLogout} >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText> <FormattedMessage id="Menu.SingOut" defualtMessage="Sing Out" /> </ListItemText>
                </MenuItem>
                
              </Menu>
      
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