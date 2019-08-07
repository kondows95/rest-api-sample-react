import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline, Box, Grid } from '@material-ui/core'
import theme from '../theme'
import ToolbarSpacer from './ToolbarSpacer'
import Header from './Header'
import CategoryList from '../containers/CategoryList'
import ItemList from '../containers/ItemList'
import Checkout from '../containers/Checkout'
import ConfirmOrder from '../containers/ConfirmOrder'
import Cart from './Cart'
import OrderList from '../containers/OrderList';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import Login from '../containers/Login';
import { IntlProvider } from "react-intl";
import { chooseLocale } from '../locations';

import PushNotification  from './PushNotification';

Amplify.configure(aws_exports);
const useStyles = makeStyles(theme => ({
  root: {
    color: 'black',
    position: 'absolute',
     top: '0%',
     paddingTop:'200px',
    background: '#fafafa',
    height: "100%"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}))
const App = ({
  locale,
  fetchAllCategories,
  fetchAllCustomers,
  fetchCartData,
  fetchAuthedUser,
  user,
  loading,
  refreshToken }) => {
  const isFirstRef = React.useRef(true);
  const classes = useStyles();
  React.useEffect(() => {
    if (isFirstRef.current) {

      isFirstRef.current = false;
      fetchAuthedUser();
      fetchCartData();
    }

    fetchAllCategories();

    const timer = window.setInterval(() => {
      refreshToken();
    }, 600000); //after 10 minutes to call refreshToken()
    return () => { // Return callback to run on unmount.
      window.clearInterval(timer);
    };

  })

  const auth = (
    <Box display="flex">
      <Header />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <ToolbarSpacer />
        <Route exact path="/" render={() => {
          return <ItemList />
        }} />
        <Route exact path="/checkout" render={() => {
          return <Checkout />
        }} />
        <Route exact path="/staffs" render={() => {
          return <PushNotification />
        }} />
        <Route exact path="/confirm" render={() => {
          return <ConfirmOrder />
        }} />
        <Route exact path="/cart" render={() => {
          return <Cart />
        }} />
        <Route exact path="/categories" render={() => {
          return <CategoryList />
        }} />
        <Route exact path="/login" render={() => {
          return <Login />
        }} />
        <Route exact path="/orderlist" render={() => {
          return <OrderList />
        }} />
        <Route exact path="/myjwt" render={() => {
          const token = user ? user.signInUserSession.accessToken.jwtToken : null
          return (<div>{token}</div>);
        }} />
      </Box>
    </Box>
  )
  const spinner = (
    <Grid container justify="center" className={classes.root} >
      <img src={require("../assets/img/spinner.gif")} width={150} height={150} alt="spinner" />
    </Grid>
  );
  const contents = user ?  auth : <Login />
  //const contents = loading ? "loading" : user ?  "auth" : "<Login />"
  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Box container className={classes.wrapper} >
          {contents}
          {loading && spinner}
        </Box>
        </Router>
      </MuiThemeProvider>
    </IntlProvider>
  )
}

App.propTypes = {
  fetchAllCategories: PropTypes.func,
  fetchAllCustomers: PropTypes.func,
  fetchAllItems: PropTypes.func,
}


export default App