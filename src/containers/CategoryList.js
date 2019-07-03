import { connect } from 'react-redux'
import CategoryList from '../components/CategoryList'

export default connect(
  (state) => ({
    items: state.items.rows,
    categories: state.categories.rows,
  }),
  null
)(CategoryList)
