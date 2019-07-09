import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { saveItem, deleteItem, setCategoryId, fetchAllItems } from '../modules/items'
import { addCartItem } from '../modules/cart'


const _getItemsByCategory = (rows, categoryId) => {
  if (categoryId <= 0) {
    return rows
  }
  else {
    console.log('_getItemsByCategory1', categoryId)
    const newRows = rows.filter(t => t.category_id == categoryId)
    console.log('_getItemsByCategory2', rows)
    return newRows
  }
}


export default connect(
  (state) => ({
    items: _getItemsByCategory(state.items.rows, state.items.selectedCateogryId),
    categories: state.categories.rows,
    noMoreFetch: state.items.noMoreFetch
  }),
  (dispatch) => ({
    saveItem: (item) =>  dispatch(saveItem(item)),
    deleteItem: (id) =>  dispatch(deleteItem(id)),
    addCartItem: (item) => dispatch(addCartItem(item)),
    setCategoryId: (categoryId) =>  dispatch(setCategoryId(categoryId)),
    fetchAllItems: () => dispatch(fetchAllItems()),
  })
)(ItemList)
