import { connect } from 'react-redux'
import App from '../components/App'
import { fetchAllCategories } from '../modules/categories'
import { fetchAllItems } from '../modules/items'


export default connect(
  null,
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAllItems: () => dispatch(fetchAllItems())
  })
)(App)
