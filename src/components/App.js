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
import Amplify from 'aws-amplify'
import aws_exports from '../aws-exports'

import Login from '../containers/Login'

Amplify.configure(aws_exports);

const App = ({locale,fetchAllCategories,fetchAllCustomers, fetchCartData, fetchAuthedUser, user, refreshToken}) => {
  
  // const timer = React.useRef();
  // React.useEffect(() => {
  //     return () => {
  //       clearTimeout(timer.current);
  //     };
  //   }, []);
    
  // timer.current = 
  
  const isFirstRef = React.useRef(true)
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAuthedUser()
      fetchCartData()
      fetchAllCategories()
    }
  })
  
    setTimeout(() => {
      refreshToken();
    }, 3000);
    

  const auth = (
    <Box display="flex">
      <Header />
      <Box flexGrow={1} display="flex" flexDirection="column">
        <ToolbarSpacer />
            <Route exact path="/checkout" render={() => {
              return <Checkout />
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
            <Route exact path="/items" render={() => {
              return <ItemList />
            }} />
            <Route exact path="/login" render={() => {
              return <Login />
            }} />
        </Box>
    </Box>  
  )

 const contents = user ? auth : <Login />

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        {contents}
      </Router>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  fetchAllCategories: PropTypes.func,
  fetchAllCustomers: PropTypes.func,
  fetchAllItems: PropTypes.func
}

export default App