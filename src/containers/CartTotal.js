import { connect } from 'react-redux'
import CartTotal from '../components/CartTotal'

export default connect(
  (state) => ({
    totalPrice: state.cart.totalPrice
  })
)(CartTotal)
