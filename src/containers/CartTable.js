import { connect } from 'react-redux'
import CartTable from '../components/CartTable'
import { deleteCartItem } from '../modules/cart.ts'

export default connect(
  (state) => ({
    cart: state.cart.rows
  }),
  (dispatch) => ({
    deleteCartItem: (itemId) => dispatch(deleteCartItem(itemId)),
  })
)(CartTable)
