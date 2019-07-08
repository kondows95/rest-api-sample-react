import React from 'react';
import Container from '@material-ui/core/Container';
import CartTable from '../containers/CartTable'
import CartTotal from '../containers/CartTotal'
import TitleBar from '../containers/TitleBar'
import Grid from '@material-ui/core/Grid'
import ToolbarSpacer from './ToolbarSpacer'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'

const Cart = () => {
  return (
    <React.Fragment>
      <TitleBar />
      <Container maxWidth="lg">
        <ToolbarSpacer />
        <Box display="flex" flexDirection="row">

        <Grid container>
          <Grid item xs={12} sm={12} md={9}>
            <Box display="flex" flexDirection="row">
              <Box flexGrow={1}>
                <CartTable/>
              </Box>
              <Hidden smDown>
                <Box mx={1} />
              </Hidden>
            </Box>            
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12}><Box my={2} /></Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={3}>
            <CartTotal/>
          </Grid>
        </Grid>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Cart;
