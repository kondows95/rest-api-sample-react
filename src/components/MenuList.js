import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core'
import {
    Photo as PhotoIcon, 
    Brush as BrushIcon, 
    Face as FaceIcon,
    ShoppingCart as ShoppingCartIcon,
    Accessibility as AccessibilityIcon,
    Payment as PaymentIcon
} from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
}))


const CategoryList = ({ categories, setCategoryId, handleDrawerClose }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <List>
        <Link to = '/categories' className={classes.link}>
          <ListItem button className="icon">
            <ListItemIcon ><BrushIcon /></ListItemIcon>
            <ListItemText>Categories</ListItemText>
          </ListItem>
        </Link>
        <Link to = '/items' className={classes.link}>
          <ListItem button className="icon">
            <ListItemIcon><PhotoIcon /></ListItemIcon>
            <ListItemText>Items</ListItemText>
          </ListItem>
        </Link>
      </List>
      
      
      <Divider />
      <List>
        <Link to = '/dummycheckout' className={classes.link}>
          <ListItem button className="icon">
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText>Checkout</ListItemText>
          </ListItem>
        </Link>
        <Link to = '/orders' className={classes.link}>
          <ListItem button className="icon">
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText>Orders</ListItemText>
          </ListItem>
        </Link>
        <Link to = '/customers' className={classes.link}>
          <ListItem button className="icon">
            <ListItemIcon><FaceIcon /></ListItemIcon>
            <ListItemText>Customers</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to = '/staffs' className={classes.link}>
          <ListItem button className="icon">
            <ListItemIcon><AccessibilityIcon /></ListItemIcon>
            <ListItemText>Staff</ListItemText>
          </ListItem>
        </Link>
      </List>
    </React.Fragment>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  setCategoryId: PropTypes.func,
  handleDrawerClose: PropTypes.func,
}

export default CategoryList
