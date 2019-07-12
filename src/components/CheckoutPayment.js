import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid, Box, CardMedia, TextField, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  default_tabStyle: {
    color: 'black',
    fontSize: 11,
    backgroundColor: '#cfcfcf',
  },
  button: {
    margin: theme.spacing(1),
  },
  indicator: {
    backgroundColor: "#cfcfcf"
  }

}));


const CheckoutPayment = ({ cart, totalPrice }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (

    <Box dispaly="column">
      <Box fontSize="h6.fontSize" pl={3} mt={2}>
        2.Payment
            </Box>
      <Box pl={3} pt={2}>
        SELECT PAYMENT METHOD
            </Box>
      <Box bgcolor="#cfcfcf" borderRadius={5} mx={3}>
        <Box bgcolor="white" >
          <Grid bgcolor="white">
            <Tabs value={value} onChange={handleChange} classes={{ indicator: classes.indicator }}>
              <Tab
                className={value === 0 ? classes.default_tabStyle : null}
                label="CREDIT CARD"
                icon={
                  <CardMedia
                    style={{ width: 100, height: 50 }}
                    image='https://www.paisabazaar.com/wp-content/uploads/2018/06/premium-credit-cards.jpg'
                    title='credit'
                  />}
              />
              <Tab
                className={value === 1 ? classes.default_tabStyle : null}
                label="PAY PAL"
                icon={
                  <CardMedia
                    style={{ width: 100, height: 50 }}
                    image='https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2014/04/Screen-Shot-2014-04-30-at-18.18.55-730x321.png'
                    title='paypal'
                  />}
              />
            </Tabs>
          </Grid>
        </Box>
        <Grid>
          {value === 0 &&
            <TabContainer >
              Please ensure the billing address matches the address held by the card user
                            <TextField1 label="Name on card *" id="card_name" name="card_name" required />
              <TextField1 label="Credit card number *" id="card_number" name="card_number" required example="Example:4111222211112222" />
              <TextField1 label="Expiry Date *" id="card_expirydate" name="card_expirydate" required />
              <TextField1 label="Security *" id="card_security" name="card_security" required example="(What is this?)" />
            </TabContainer>}
          {value === 1 && <TabContainer>
            Please ensure the billing address matches the address held by the card user
                            <TextField1 label="Name on card *" id="card_name" name="card_name" required />
            <TextField1 label="Paypal number *" id="card_number" name="card_number" required example="Example:4111222211112222" />
            <TextField1 label="Expiry Date *" id="card_expirydate" name="card_expirydate" required />
            <TextField1 label="Security *" id="card_security" name="card_security" required example="(What is this?)" />
          </TabContainer>}
        </Grid>
      </Box>
    </Box>

  );
}
export default CheckoutPayment;
const TextField1 = ({ label, id, name, required, example }) => (
  <Grid container  >
    <Grid item xs={12} sm={3}  >
      <Box textAlign="left" my={2} >{label}</Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        // required={required === undefined ? false : true}
        id={id}
        name={name}
        style={{ paddingRight: 8 }}
        fullWidth
        margin="dense"
        variant="outlined"
      />
      {example === undefined ? null : <small>{example}</small>
      }
    </Grid>
  </Grid>
)
