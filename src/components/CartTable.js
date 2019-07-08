import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { BASEURL_ITEM_IMAGES } from '../constants'
import QuantitySelect from '../containers/QuantitySelect'
import CartItemPropTypes from './CartItemPropTypes'
import {Box, Grid, Paper, CardMedia, Divider, Hidden, Link} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  gridRight: {
    margin: 'auto',
    textAlign: 'right',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  gridLeft: {
    margin: 'auto',
    textAlign: 'left',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  descContainer: {
    display: 'flex',
  },
  descImagePC: {
    width: 50,
    height: 64
  },
  descImageMobile: {
    height: 0,
    paddingTop: '128%',
  },
  descTitle: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginLeft: theme.spacing(2),
  },
  deleteLink: {
    marginTop: theme.spacing(1),
  },
  rightItem: {
    paddingLeft: theme.spacing(1),
  }
}));

const CartTable = ({ cart, deleteCartItem }) => {
  const classes = useStyles()

  //componet list for PC
  const tableRows = [] //for PC
  tableRows.push(
    <Grid key={0} container>
      <Grid item xs={4}>
        <Box textAlign="left" my={2} ml={2}>Desc</Box>
      </Grid>
      <Grid item xs={2}>
        <Box textAlign="right" my={2}>@ (Ks)</Box>
      </Grid>
      <Grid item xs={2}>
        <Box textAlign="right" my={2}>Qty.</Box>
      </Grid>
      <Grid item xs={2}>
        <Box textAlign="right" my={2} mr={2}>Price (Ks)</Box>
      </Grid>
      <Grid item xs={2}>
        <Box m={1} />
      </Grid>
      <Grid item xs={12}><Divider /></Grid>
    </Grid>
  )

  //componet list for Mobile
  const paperRows = [] //for Mobile

  //loop per cartItem
  cart.forEach((row, i) => {
    const divider = (i + 1 < cart.length) ? (<Grid item xs={12}><Divider /></Grid>) : null

    //rows for PC
    tableRows.push(
      <Grid container key={row.id}>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="row" pl={2} py={1}>
            <CardMedia
              className={classes.descImagePC}
              image={BASEURL_ITEM_IMAGES+row.image}
              //image={"http://127.0.0.1/dummyImage.jpg"}
              title={row.name}
            />
            <Box textAlign="left" ml={2} my="auto" fontWeight={600}>
              {row.name}
            </Box>  
          </Box>
          
        </Grid>
        <Grid item xs={2} >
          <Box display="flex" height="100%">
            <Box textAlign="right" my="auto" ml="auto" mr={0}>
              {row.price}
            </Box>  
          </Box>   
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" height="100%">
            <Box my="auto" ml="auto" mr={0}>
              <Box pl="auto">
                <QuantitySelect id={row.id} quantity={row.quantity} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.gridRight}>
          <Box textAlign="right" fontWeight={600}>
            {row.subTotal}
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.gridRight}>
          <Link onClick={() => deleteCartItem(row.id)}>
            Delete
          </Link>
        </Grid>
        {divider}
      </Grid>
    )

    //rows for Mobile
    paperRows.push(
      <Grid container key={row.id}>
        <Grid item xs={4}>
          <Box m={2}>
            <CardMedia
              className={classes.descImageMobile}
              //image={BASEURL_ITEM_IMAGES+row.image}
              image={"http://127.0.0.1/dummyImage.jpg"}
              title={row.name}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" height='100%'>
            <Box flexGrow="1" my="auto">
              <Box fontWeight={600} my={1} textAlign="left" >
                {row.name}
              </Box>
              <Box display="flex" my={1} flexDirection="row">
                <Box fontWeight={600} textAlign="left" >
                  {row.subTotal} Ks
                </Box>
                <Box ml="auto" mr={2}>
                  <Link onClick={() => deleteCartItem(row.id)}>
                    Delete
                  </Link>
                </Box>
              </Box>
              <Box display="flex" my={1} flexDirection="row">
                <QuantitySelect id={row.id} quantity={row.quantity} />
                <Box textAlign="left">
                  @{row.price} Ks
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>{divider}</Grid> 
      </Grid>
    )
  })

  return (
    <Paper>
      <Hidden smUp implementation="css">
      {paperRows}  
      </Hidden>
      <Hidden xsDown implementation="css">
        {tableRows}
      </Hidden>
    </Paper>
  )
}

CartTable.propTypes = {
  cart: PropTypes.arrayOf(CartItemPropTypes.isRequired).isRequired,
}

export default CartTable;
