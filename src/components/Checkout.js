import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box,TextField } from '@material-ui/core';

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
      <Box fontSize="h6.fontSize">
        Shipping address
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={"shipping_firstName"}
            name={"shipping_firstName"}
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
      </Grid>
    </form>
  );
}