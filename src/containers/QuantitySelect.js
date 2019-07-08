import { connect } from 'react-redux'
import QuantitySelect from '../components/QuantitySelect'
import { changeQuantity } from '../modules/cart'

export default connect(
  (state) => ({
    maxQuantity: state.cart.maxQuantity
  }),
  (dispatch) => ({
    changeQuantity: (itemId, quantity) => dispatch(changeQuantity(itemId, quantity)),    
  })
)(QuantitySelect)
