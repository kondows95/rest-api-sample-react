import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { saveItem, deleteItem, setCategoryId, fetchAllItems, dialogBox } from '../modules/items.ts'
import { addCartItem } from '../modules/cart.ts'
import { uploadImage } from '../modules/image.ts'
import { changeAuthState } from '../modules/auth.ts'


const _getItemsByCategory = (rows, categoryId) => {
  if (categoryId === null) {
    return rows
  }
  else {
    const newRows = rows.filter(t => Number(t.category_id) === Number(categoryId))
    return newRows
  }
}


export default connect(
  (state) => ({
    items: _getItemsByCategory(state.items.rows, state.items.selectedCateogryId),
    categories: state.categories.rows,
    noMoreFetch: state.items.noMoreFetch,
    user: state.auth.user,
    loading:state.items.loading,
    closeDialog:state.items.closeDialog
  }),
  (dispatch) => ({
    saveItem: (item, fileName, fileData) =>  dispatch(saveItem(item, fileName, fileData)),
    deleteItem: (id) =>  dispatch(deleteItem(id)),
    addCartItem: (item) => dispatch(addCartItem(item)),
    setCategoryId: (categoryId) =>  dispatch(setCategoryId(categoryId)),
    fetchAllItems: () => dispatch(fetchAllItems()),
    uploadImage: (fileName, fileData, contentType) => dispatch(uploadImage(fileName, fileData, contentType)),
    changeAuthState: (value) => dispatch(changeAuthState(value)),
    dialogBox:(value) => dispatch(dialogBox(value))
  })
)(ItemList)
