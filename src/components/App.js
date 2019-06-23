import React from 'react';
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline, Box } from '@material-ui/core'
import theme from '../theme'
import ToolbarSpacer from './ToolbarSpacer'
import Header from './Header'
import CategoryList from '../containers/CategoryList'

const App = ({fetchAllCategories}) => {
  React.useEffect(() => {
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
            <Route exact path="/" render={() => {
              return <CategoryList />
            }} />
          </Box>
        </Box>
      </Router>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  fetchAllCategories: PropTypes.func.isRequired,
}

export default App