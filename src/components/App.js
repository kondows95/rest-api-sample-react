import React from 'react';
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline, Box } from '@material-ui/core'
import theme from '../theme'
import ToolbarSpacer from './ToolbarSpacer'
import Header from './Header'
import CategoryList from '../containers/CategoryList'
import ItemList from '../containers/ItemList'
import Checkout from '../containers/Checkout'
import ConfirmOrder from '../containers/ConfirmOrder'
import Cart from './Cart'

import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import Login from '../containers/Login';
import { IntlProvider } from "react-intl";
import { chooseLocale } from '../locations';

import Federated from './Federated';
import Testing from './Testing';

Amplify.configure(aws_exports);

const App = ({locale,fetchAllCategories,fetchAllCustomers, fetchCartData, fetchAuthedUser, user, refreshToken}) => {
  const isFirstRef = React.useRef(true)
  
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
              return <Testing />
            }} />
            <Route exact path="/staffs" render={() => {
              return <Federated />
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
            <Route exact path="/myjwt" render={() => {
              const token = user ? user.signInUserSession.accessToken.jwtToken : null
              return (<div>{token}</div>);
            }} />
        </Box>
    </Box>  
  )

 const contents = user ? auth : <Login />

  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          {contents}
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