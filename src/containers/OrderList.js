import { connect } from 'react-redux'
import OrderList from '../components/OrderList'
import {orderListFetch} from '../modules/orderList';

export default connect(
  (state) => ({
    orderListObj:state.orderList.orderListObj
  }),
  (dispatch) => ({
    orderListFetch: (offset) => dispatch(orderListFetch(offset))
  })
)(OrderList)