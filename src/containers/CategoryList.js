import { connect } from 'react-redux'
import CategoryList from '../components/CategoryList'
import { saveCategory, deleteCategory } from '../modules/categories'

export default connect(
  (state) => ({
    items: state.items.rows,
    categories: state.categories.rows,
  }),
  (dispatch) => ({
    saveCategory: (category) =>  dispatch(saveCategory(category)),
    deleteCategory: (id) =>  dispatch(deleteCategory(id)),
  })
)(CategoryList)
