import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { saveItem, deleteItem } from '../modules/items'
import { addCartItem } from '../modules/cart'

export default connect(
  (state) => ({
    items: state.items.rows,
    categories: state.categories.rows,
  }),
  (dispatch) => ({
    saveItem: (item) =>  dispatch(saveItem(item)),
    deleteItem: (id) =>  dispatch(deleteItem(id)),
    addCartItem: (item) => dispatch(addCartItem(item)),
  })
)(ItemList)
