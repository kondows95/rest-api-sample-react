import { connect } from 'react-redux'
import CategoryList from '../components/CategoryList'
import { saveCategory, deleteCategory, dialogBox } from '../modules/categories'

export default connect(
  (state) => ({
    items: state.items.rows,
    categories: state.categories.rows,
    loading:state.categories.loading,
    closeDialog:state.categories.closeDialog
  }),
  (dispatch) => ({
    saveCategory: (category) =>  dispatch(saveCategory(category)),
    deleteCategory: (id) =>  dispatch(deleteCategory(id)),
    dialogBox:(value) => dispatch(dialogBox(value)),
  })
)(CategoryList)
