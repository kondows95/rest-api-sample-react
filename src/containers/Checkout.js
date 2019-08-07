import { connect } from 'react-redux'
import Checkout from '../components/Checkout'
import { setRequestParams, postOrder } from '../modules/order.ts'

export default connect(
  (state) => ({
    requestParams: state.order.requestParams,
    postResultObj: state.order.postResultObj
  }),
  (dispatch) => ({
    setRequestParams: (addressForm) =>  dispatch(setRequestParams(addressForm)),
    postOrder: () =>  dispatch(postOrder())
  })
)(Checkout)