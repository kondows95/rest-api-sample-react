import { connect } from 'react-redux'
import TitleBar from '../components/TitleBar'

export default connect(
  (state) => ({
    totalQuantity:  state.cart.totalQuantity,
  }),
  null
)(TitleBar)
