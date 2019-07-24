import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core'
import {
    Photo as PhotoIcon, 
    Brush as BrushIcon, 
    Accessibility as AccessibilityIcon
} from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
}))


const CategoryList = ({ handleDrawerClose }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <List>
        <Link to = '/categories' className={classes.link} onClick={handleDrawerClose}>
          <ListItem button className="icon">
            <ListItemIcon ><BrushIcon /></ListItemIcon>
            <ListItemText>Categories</ListItemText>
          </ListItem>
        </Link>
        <Link to = '/' className={classes.link} onClick={handleDrawerClose}>
          <ListItem button className="icon">
            <ListItemIcon><PhotoIcon /></ListItemIcon>
            <ListItemText>Items</ListItemText>
          </ListItem>
        </Link>
      </List>
      
    
      <Divider />
      <List>
        <Link to = '/staffs' className={classes.link} onClick={handleDrawerClose}>
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
  handleDrawerClose: PropTypes.func,
}

export default CategoryList
