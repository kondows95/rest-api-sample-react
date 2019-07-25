import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'

const CartTotal = ({totalPrice, totalQuantity}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Card>
        <CardContent>
          <Box mt={1} fontSize="h6.fontSize" fontWeight={600}>
            Total {totalPrice} Ks
          </Box>
        </CardContent>
       
        <CardActions >
          <Box style={{ width: '100%' }}>
          <Link to={totalQuantity > 0 ? "/checkout": "#"}  style={{ textDecoration: 'none'  }}>
          <Button fullWidth={true}  disabled={totalQuantity > 0 ? false: true}   variant="contained" color="secondary">
            Confirm Order
          </Button>
          </Link>
          </Box>
        </CardActions>

        <CardContent>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button fullWidth={true}  color="primary">
            <Box fontSize={11} fontWeight={300} >Continue Shopping</Box>
          </Button>
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
