import { connect } from 'react-redux'
import App from '../components/App'
import { fetchAllCategories } from '../modules/categories'
import { fetchCartData } from '../modules/cart'

export default connect(
  null,
  (dispatch) => ({
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    fetchCartData: () => dispatch(fetchCartData()),
  })
)(App)
