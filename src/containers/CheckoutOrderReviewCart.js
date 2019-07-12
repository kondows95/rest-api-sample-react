import { connect } from 'react-redux'
import CheckoutOrderReviewCart from '../components/CheckoutOrderReviewCart'

export default connect(
  (state) => ({
    cart: state.cart.rows, totalPrice: state.cart.totalPrice
  }),
  null
)(CheckoutOrderReviewCart)