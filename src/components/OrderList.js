import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

const OrderList = ({ }) => {
  const classes = useStyles()

  return (
    <Box>
      <h1>Order List</h1>
    </Box>
  );
}
export default OrderList;


