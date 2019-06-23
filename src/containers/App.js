import { connect } from 'react-redux'
import App from '../components/App'
import { fetchAllCategories } from '../modules/categories'


export default connect(
  null,
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
  })
)(App)
