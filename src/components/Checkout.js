import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, TextField, Radio, Button, } from '@material-ui/core';
import CheckoutOrderReviewCart from '../containers/CheckoutOrderReviewCart';
import CheckoutPayment from '../containers/CheckoutPayment';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { withRouter } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

const AddressForm = ({ requestParams, setRequestParams, history }) => {
  const classes = useStyles()
  const initialForm = {
    first_name: requestParams !== null ? requestParams.first_name : "",
    last_name: requestParams !== null ? requestParams.last_name : "",
    address1: requestParams !== null ? requestParams.address1 : "" ,
    address2: requestParams !== null ? requestParams.address2 : "",
    country: requestParams !== null ? requestParams.country : "",
    state: requestParams !== null ? requestParams.state : "",
    city: requestParams !== null ? requestParams.city : ""
  }

  const [form, setForm] = React.useState(initialForm)
  const handleChangeValue = fieldName => event => {
    const newForm = { ...form }
    newForm[fieldName] = event.target.value
    setForm(newForm)
  }
  const handleSubmit = event => {
    event.preventDefault();
    setRequestParams(form);
  
    history.push("/confirm");
  }

  return (
    <Box>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Box fontSize="h6.fontSize" pl={3} >
          1.Shipping Information
        </Box>
        <Box pl={3} pt={2}>
          IF SHIPPING TO A WORK ADDRESS, PLEASE INCLUDE THE COMPANY NAME
        </Box>
        <Box pl={3} pt={1}>
          YOUR INFORMATION
        </Box>
        <Box mx={3} p={2} borderRadius={5} bgcolor="#cfcfcf">
          <TextField1 label="First Name *" id="first_name" name="first_name" value={form.first_name} onChange={handleChangeValue("first_name")} required="true" />
          <TextField1 label="Last Name" id="last_name" name="last_name" value={form.last_name} onChange={handleChangeValue("last_name")} />
          <TextField1 label="Address1 *" id="address1" name="address1" value={form.address1} onChange={handleChangeValue("address1")} required="true" />
          <TextField1 label="Address2" id="address2" name="address2" value={form.address2} onChange={handleChangeValue("address2")}  />
          <TextField1 label="Country *" id="country" name="country" value={form.country} onChange={handleChangeValue("country")} required="true" />
          <TextField1 label="State" id="state" name="state" value={form.state} onChange={handleChangeValue("state")} />
          <TextField1 label="City *" id="city" name="city" value={form.city} onChange={handleChangeValue("city")} required="true" />
        </Box>
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
        <Box flexGrow={1} p={2}>
          <CheckoutOrderReviewCart />
        </Box>
        <CheckoutPayment />
        <Box mx={3} p={2} mt={1} mb={5} borderRadius={5} bgcolor="#cfcfcf">
          By clicking 'PROCEED TO PAYMENT' you agree to our Terms and Conditions and you have reviewed your and personal details.
               <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                 PROCEED TO COMFIRM
               </Button>
        </Box>
      </form>
     
    </Box>
  );
}
export default withRouter(AddressForm)

const TextField1 = ({ label, id, name, value, onChange, required }) => (
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
        value={value}
        onChange={onChange}
        fullWidth
        margin="dense"
        variant="outlined"
      />
    </Grid>
  </Grid>
)

