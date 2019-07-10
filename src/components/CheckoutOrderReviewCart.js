import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BASEURL_ITEM_IMAGES } from '../constants'
import { Grid, Box, CardMedia, Paper, Link, TextField, Checkbox, MenuItem, Radio, Divider, Hidden } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { Subtitles, FormatBold } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    descImagePC: {
        width: 70,
        height: 100
    },
    menu: {
        width: 200,
    },
}));

const CheckoutOrderReviewCart = ({ cart, totalPrice }) => {
    console.log(cart)
    const classes = useStyles()
    const mobileView = [];
    const pcView = [];
    const Netprice = () => (
        <Box display="flex" mt={2} pl={3}>
            <Grid xs={0} sm={4}>
                <Box> </Box>
            </Grid>
            <Grid xs={6} sm={4}>
                <Box> SUBTOTAL </Box>
                <Box> SHIPPING COSTS </Box>
                <Box> ADDITIONAL SHIPPING COSTS</Box>
                <Box>SALES TAX</Box>
                <Box>TOTAL COSTS(4 ARTICLSE)</Box>
            </Grid>
            <Grid xs={6} sm={4} >
                <Box textAlign="right" pr={3}> {totalPrice} MMK </Box>
                <Box textAlign="right" pr={3}> 0.0 MMK </Box>
                <Box textAlign="right" pr={3}> 0.0 MMK </Box>
                <Box textAlign="right" pr={3}> 0.0 MMK </Box>
                <Box textAlign="right" pr={3}> {totalPrice} MMK</Box>
            </Grid>
        </Box>



    )
    cart.map((cartList, k) => {
        pcView.push(
            <Grid container key={cartList.id}>
                <Box flexGrow={1} display="flex">
                    <Grid xs={3}>
                        <Box textAlign="left" my={2} pl={3}>
                            <CardMedia
                                className={classes.descImagePC}
                                image={BASEURL_ITEM_IMAGES + cartList.image}
                                title={cartList.name}
                            />
                        </Box>
                    </Grid>
                    <Grid xs={3}>
                        <Box textAlign="left" my={2} fontWeight="100">
                            {cartList.name}
                        </Box>
                    </Grid>
                    <Grid xs={2}>
                        <Box textAlign="left" my={2} >
                            {cartList.quantity}x
                        </Box>
                    </Grid>
                </Box>
                <Grid xs={2}>
                    <Box textAlign="right" my={2} pr={3}>
                        <Box pb={2}>{cartList.quantity}x{cartList.price} MMK</Box>
                        <Box> {cartList.subTotal} MMK </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}><Divider /></Grid>
            </Grid>
        )
    })
    cart.map((cartList, k) => {
        mobileView.push(
            <Grid container key={cartList.id}>
                <Box flexGrow={1} display="flex">
                    <Grid xs={6}>
                        <Box textAlign="left" my={2} pl={3}>
                            <CardMedia
                                className={classes.descImagePC}
                                image={BASEURL_ITEM_IMAGES + cartList.image}
                                title={cartList.name}
                            />
                        </Box>
                    </Grid>
                    <Grid xs={6}>
                        <Box textAlign="right" my={2} pr={3} fontWeight="fontWeightBold">
                           {cartList.name} 
                        </Box>
                        <Box textAlign="right" my={2} pr={3} >
                            {cartList.quantity}x {cartList.price} MMK
                        </Box>
                        <Box textAlign="right" my={2} pr={3}>
                           {cartList.subTotal} MMK 
                        </Box>
                    </Grid>
                </Box>
                <Grid item xs={12}><Divider /></Grid>
            </Grid>
        )
    })

    return (
        <Paper>
            <Box fontSize="h6.fontSize" pl={3} mt={2}>
                2.Order Review
            </Box>
            <Box pl={3} pt={2}>
                SELECT SHIPPING METHOD
            </Box>
            <Box mx={3} p={1} mt={1} bgcolor="#cfcfcf">
                <Radio
                    // checked={selectedValue === 'e'}
                    // onChange={handleChange}
                    // value="e"
                    color="default"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'E' }}
                    icon={<RadioButtonUncheckedIcon fontSize="small" />}
                    checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
                />
                FedEx-3-4 business day(s)
             </Box>
            <Hidden xsDown implementation="css">
                <Grid key={0} container>
                    <Box flexGrow={1} display="flex">
                        <Grid xs={3} >
                            <Box textAlign="left" my={2} pl={3}>PRODUCT</Box>
                        </Grid>
                        <Grid xs={3}>
                            <Box textAlign="left" my={2} xs={3} >DESCRIPTION</Box>
                        </Grid>
                        <Grid xs={2}>
                            <Box textAlign="left" my={2} xs={3}>QUANTITY</Box>
                        </Grid>
                    </Box>
                    <Grid xs={2}>
                        <Box textAlign="right" my={2} pr={3} xs={3}>PRICE</Box>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                </Grid>
                {pcView}
            </Hidden>
            <Hidden smUp implementataion="css">
                {mobileView}
            </Hidden>
            <Netprice />
           
        </Paper>
    );
}
export default CheckoutOrderReviewCart;
