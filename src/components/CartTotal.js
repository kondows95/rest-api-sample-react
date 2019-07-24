import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Box from '@material-ui/core/Box'
import { Link as RouterLink } from 'react-router-dom'

const CartTotal = ({totalPrice, totalQuantity}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Card>
        <CardContent>
          <Box mt={1} fontSize="h6.fontSize" fontWeight={600}>
            Total {totalPrice} Ks
          </Box>
        </CardContent>
       
        <CardActions>
          <Button to="/checkout" disabled={totalQuantity > 0 ? false: true} component={RouterLink} fullWidth={true} variant="contained" color="secondary">
            Confirm Order
          </Button>
        </CardActions>

        <CardContent>
          <Button to="/" component={RouterLink} fullWidth={true}  color="primary">
            <Box fontSize={11} fontWeight={300} >Continue Shopping</Box>
          </Button>
        </CardContent>
      </Card>
    </Box>  
  )
}

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}

export default CartTotal
