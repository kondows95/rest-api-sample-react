import React from 'react';
import PropTypes from 'prop-types'
import NativeSelect from '@material-ui/core/NativeSelect';

const QuantitySelect = ({ id, quantity, maxQuantity, changeQuantity }) => {
  const options = []
  for (let i = 1; i <= Math.max(20, maxQuantity); i++) {
    options.push(
      <option key={i} value={i}>{i}</option>
    )
  }
  return (
    <NativeSelect
      value={quantity}
      onChange={(event) => changeQuantity(id, event.target.value)}
    >
      {options}
    </NativeSelect>
  )
}

QuantitySelect.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  maxQuantity: PropTypes.number.isRequired,
  changeQuantity: PropTypes.func,
}

export default QuantitySelect
