import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

const CartTotal = ({totalPrice}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Card>
        <CardContent>
          <Box mt={1} fontSize="h6.fontSize" fontWeight={600}>
            Total {totalPrice} Ks
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth={true} variant="contained" color="secondary">
            Confirm Order
          </Button>
        </CardActions>
        <CardContent>
          <Link to="/"
            component={RouterLink}>
            Continue Shopping
          </Link>
        </CardContent>
      </Card>
    </Box>  
  )
}

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}

export default CartTotal
