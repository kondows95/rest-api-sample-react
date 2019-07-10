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
import Checkout from '../components/Checkout'
import Cart from './Cart'

const App = ({locale,fetchAllCategories,fetchAllCustomers, fetchCartData}) => {
  React.useEffect(() => {
    fetchCartData()
    fetchAllCategories()
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box display="flex">
          <Header />
          <Box flexGrow={1} display="flex" flexDirection="column">
            <ToolbarSpacer />
            <Route exact path="/checkout" render={() => {
              return <Checkout />
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
          </Box>
        </Box>
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