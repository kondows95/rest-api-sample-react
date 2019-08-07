import { connect } from 'react-redux'
import ConfirmOrder from '../components/ConfirmOrder'
import { setRequestParams, postOrder } from '../modules/order.ts'

export default connect(
  (state) => ({
    cart: state.cart.rows,
    requestParams: state.order.requestParams,
    postResultObj: state.order.postResultObj
  }),
  (dispatch) => ({
    setRequestParams: (addressForm) =>  dispatch(setRequestParams(addressForm)),
    postOrder: () =>  dispatch(postOrder())
  })
)(ConfirmOrder)