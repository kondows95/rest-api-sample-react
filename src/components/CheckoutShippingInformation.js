import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, TextField, Checkbox, MenuItem, Radio } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { Subtitles } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
}));
const country = [
  {
    value: 'Myanmar',
    label: 'Myanmar',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'USA',
    label: 'USA',
  },
];
 const CheckoutShippingInformation=()=> {
  const [values, setValues] = React.useState({
    country: 'Japan',
  });

  const classes = useStyles()
  return (
    <form className={classes.form} noValidate>
      <Box fontSize="h6.fontSize" pl={3} >
        1.Shipping Information
      </Box>
      <Box pl={3} pt={2}>
        IF SHIPPING TO A WORK ADDRESS, PLEASE INCLUDE THE COMPANY NAME
      </Box>
      <Box pl={3} pt={1}>
        YOUR INFORMATION
      </Box>
      <Box mx={3} pl={1} pt={2} bgcolor="#cfcfcf">
        <TextField1 label="First Name *" id="shipping_firstName" name="shipping_firstName" required="true" />
        <TextField1 label="Last Name *" id="shipping_lastName" name="shipping_lastName" required="true" />
        <TextField1 label="Email *" id="shipping_email" name="shipping_email" required="true" />
        <TextField1 label="Phone *" id="shipping_phone" name="shipping_phone" required="true" />
      </Box>
      <Box mx={3} p={1} mt={1} bgcolor="#cfcfcf">
        <Checkbox
          label={""}
        //  key={x.toString()}
        //  onChange={e => this.handleCheck(e, x)}
        //   checked={this.state.checkedValues.includes(x)}
        />
        Sign Up to get the latest news on all things SUISTUDIO
      </Box>
      <Box mx={3} mt={1} pl={1} pt={2} bgcolor="#cfcfcf">
        <TextField1 label="First Name *" id="shipping_firstName" name="shipping_firstName" required />
        <TextField1 label="Last Name *" id="shipping_lastName" name="shipping_lastName" required />
        <TextField1 label="Company" id="shipping_company" name="shipping_company" />
        <TextField1 label="Zip Code *" id="shipping_zipCode" name="shipping_zipCode" required />
        <TextField1 label="Street Address *" id="shipping_streetAddress" name="shipping_streetAddress" required />
        <TextField1 label="Additional Information(building,floor,access code,etc)" id="shipping_additionalInfo" name="shipping_additionalInfo" />
        <Grid container  >
          <Grid item xs={12} sm={3}  >
           <Box textAlign="left" my={2}> </Box>  Country *
         </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="filled-select-currency"
              select
              className={classes.textField}
              value={values.country}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              style={{ paddingRight: 8, marginLeft: 1 }}
              fullWidth
              margin="dense"
              variant="outlined"
            >
              {country.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <TextField1 label="State *" id="shipping_state" name="shipping_state" required />
        <TextField1 label="City *" id="shipping_city" name="shipping_city" required />
        <Checkbox
          label={""}
        // key={x.toString()}
        //  onChange={e => this.handleCheck(e, x)}
        //   checked={this.state.checkedValues.includes(x)}
        />
        Use this address for billing
      </Box>
    </form>
  );
}
export default CheckoutShippingInformation;
const TextField1 = ({ label, id, name, required }) => (
  <Grid container  >
    <Grid item xs={12} sm={3}  >
     <Box textAlign="left" my={2} >{label}</Box> 
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required={required === undefined ? false : true}
        id={id}
        name={name}
        style={{ paddingRight: 8 }}
        fullWidth
        margin="dense"
        variant="outlined"
      />
    </Grid>
  </Grid>
)