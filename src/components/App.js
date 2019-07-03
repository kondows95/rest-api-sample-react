import React from 'react';
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline, Box } from '@material-ui/core'
import theme from '../theme'
import ToolbarSpacer from './ToolbarSpacer'
import Header from './Header'
import CategoryList from '../containers/CategoryList'
import CustomerList from '../containers/CustomerList'
import ItemList from '../containers/ItemList'

const App = ({locale,fetchAllCategories,fetchAllCustomers, fetchAllItems}) => {
  React.useEffect(() => {
    //
    //fetchAllCustomers()
    fetchAllCategories()
    fetchAllItems()
    
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box display="flex">
          <Header />
          <Box flexGrow={1} display="flex" flexDirection="column">
            <ToolbarSpacer />
            <Route exact path="/" render={() => {
              return <CategoryList />
            }} />
            <Route exact path="/customer" render={() => {
              return <CustomerList />
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