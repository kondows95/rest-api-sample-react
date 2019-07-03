import { connect } from 'react-redux'
import CustomerList from '../components/CustomerList'

export default connect(
  (state) => ({
    customers: state.customers.rows,
  }),
  null
)(CustomerList)