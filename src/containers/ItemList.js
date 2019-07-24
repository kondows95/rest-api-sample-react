import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { saveItem, deleteItem, setCategoryId, fetchAllItems } from '../modules/items'
import { addCartItem } from '../modules/cart'
import { uploadImage } from '../modules/image'
import { changeAuthState } from '../modules/auth'


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
  }),
  (dispatch) => ({
    saveItem: (item, fileName, fileData) =>  dispatch(saveItem(item, fileName, fileData)),
    deleteItem: (id) =>  dispatch(deleteItem(id)),
    addCartItem: (item) => dispatch(addCartItem(item)),
    setCategoryId: (categoryId) =>  dispatch(setCategoryId(categoryId)),
    fetchAllItems: () => dispatch(fetchAllItems()),
    uploadImage: (fileName, fileData, contentType) => dispatch(uploadImage(fileName, fileData, contentType)),
    changeAuthState: (value) => dispatch(changeAuthState(value)),
  })
)(ItemList)
