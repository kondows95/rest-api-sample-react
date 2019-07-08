import PropTypes from 'prop-types'
import ItemPropTypes from './ItemPropTypes'

const propTypes = {...ItemPropTypes}
propTypes.quantity = PropTypes.number.isRequired
propTypes.subTotal = PropTypes.number.isRequired
export default propTypes