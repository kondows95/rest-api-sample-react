import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Paper, Button } from '@material-ui/core';
import CheckoutOrderReviewCart from '../containers/CheckoutOrderReviewCart';
import { withRouter } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(2)
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const ConfirmForm = ({ cart, requestParams, postResultObj, setRequestParams, postOrder, history }) => {
  const classes = useStyles()
  const handlePrevious = () => {
    history.push("/checkout");
  };

  const handleSubmit = event => {
    event.preventDefault();
    postOrder();
  }

  const handleHome = event => {
    event.preventDefault();
    history.push("/");
  }

  return (
    <Box>
      {postResultObj === null ?
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Box fontSize="h6.fontSize" pl={3} mt={2}>
            1.Order contents
                    </Box>
          <Box flexGrow={1} p={2}>
            <CheckoutOrderReviewCart />
          </Box>
          <Box fontSize="h6.fontSize" pl={3} mt={2}>
            2.Shipping Address
                    </Box>
          <Box flexGrow={1} p={2}>
            <Grid container  >
              <Grid item xs={12} sm={6}  >
                <Box p={1} >
                  <Address label="First Name" value={requestParams !== null ? requestParams.first_name : null} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box p={1} >
                  <Address label="Last Name" value={requestParams !== null ? requestParams.last_name : null} />
                </Box>
              </Grid>
            </Grid>
            <Grid container  >
              <Grid item xs={12} sm={6}  >
                <Box p={1} >
                  <Address label="Address1" value={requestParams !== null ? requestParams.address1 : null} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box p={1}>
                  <Address label="Address2" value={requestParams !== null ? requestParams.address2 : null} />
                </Box>
              </Grid>
            </Grid>
            <Grid container  >
              <Grid item xs={12} sm={6}  >
                <Box p={1} >
                  <Address label="Country" value={requestParams !== null ? requestParams.country : null} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box p={1}>
                  <Address label="State" value={requestParams !== null ? requestParams.state : null} />
                </Box>
              </Grid>
            </Grid>
            <Grid container  >
              <Grid item xs={12} sm={6}  >
                <Box p={1} >
                  <Address label="City" value={requestParams !== null ? requestParams.city : null} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box fontSize="h6.fontSize" pl={3} mt={2}>
            3.Payment Method
                    </Box>
          <Box flexGrow={1} p={2}>
            <Paper>
              <Box p={2} bgcolor="#e9e9ef">Credit Card Pay</Box>
            </Paper>
          </Box>
          <Box mx={3} p={1} mt={1}>
            <Box textAlign="center"  >
              <Button onClick={handlePrevious} variant="contained" color="primary" className={classes.button}>
                <ArrowLeft className={classes.leftIcon} />
                Go Previous
              </Button>
              <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                Make an order
                <ArrowRight className={classes.rightIcon} />
              </Button>
            </Box>
          </Box>
        </form>

        :
        <Grid>
          <Box fontSize="h6.fontSize" pl={3} mt={2}>
            Thank you for your order.
          </Box>
          <Box pl={3} pt={1}>
            Thank you very much for your order.
          </Box>
          <Box pl={3} pt={3}>
            Order contents have been sent through [order confirmation mail].
          </Box>
          <Box pl={3}>
            Please confirm the order contents, if there are any mismatches or unclear points, please contact us.
          </Box>
          <Box flexGrow={1} p={2}>
            <Paper>
              <Box p={2} bgcolor="#e9e9ef">Order Number</Box>
              <Box p={3} mb={3} bgcolor="#fff">{postResultObj.id}</Box>
            </Paper>
          </Box>
          <Box flexGrow={1} p={2}>
            <Paper>
              <Box p={2} bgcolor="#e9e9ef">Total Price</Box>
              <Box p={3} mb={3} bgcolor="#fff">{postResultObj.total_price} MMK</Box>
            </Paper>
          </Box>
          <Box textAlign="center" >
            <Button onClick={handleHome} variant="contained" color="secondary" className={classes.button}>
              <HomeIcon className={classes.leftIcon} />
              Go To HOME
            </Button>
          </Box>
        </Grid>
      }
    </Box>
  );
}
export default withRouter(ConfirmForm);

const Address = ({ label, value }) => (
  <Paper>
    <Box p={2} bgcolor="#e9e9ef">{label}</Box>
    <Box p={3} mb={3} bgcolor="#fff">{value}</Box>
  </Paper>
)


