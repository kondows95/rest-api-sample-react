import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { updateItem } from '../modules/items'

export default connect(
  (state) => ({
    items: state.items.rows,
    categories: state.categories.rows,
  }),
  (dispatch) => ({
    updateItem: (id, data) => dispatch(updateItem(id, data)),
  })
)(ItemList)
