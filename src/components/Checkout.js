import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box,TextField } from '@material-ui/core';
import CheckoutShippingInformation from '../containers/CheckoutShippingInformation';
import CheckoutOrderReviewCart from '../containers/CheckoutOrderReviewCart';
import CheckoutPayment from '../containers/CheckoutPayment';
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddressForm() {
  const classes = useStyles()
  return (
    <form className={classes.form} noValidate>
      <CheckoutShippingInformation />
      <CheckoutOrderReviewCart />
      <CheckoutPayment />
    </form>
  );
}