import { connect } from 'react-redux'
import App from '../components/App'
import { fetchAllCategories } from '../modules/categories'
import { fetchAllCustomers } from '../modules/customers'
import { fetchAllItems } from '../modules/items'


export default connect(
  null,
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchAllCustomers: () => dispatch(fetchAllCustomers()),
    fetchAllItems: () => dispatch(fetchAllItems())
  })
)(App)
