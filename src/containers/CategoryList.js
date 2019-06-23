import { connect } from 'react-redux'
import CategoryList from '../components/CategoryList'

export default connect(
  (state) => ({
    categories: state.categories.rows,
  }),
  null
)(CategoryList)
