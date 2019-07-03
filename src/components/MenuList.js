import React from 'react'
import PropTypes from 'prop-types'
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core'
import {
    Photo as PhotoIcon, 
    Brush as BrushIcon, 
    Face as FaceIcon,
    ShoppingCart as ShoppingCartIcon,
    Accessibility as AccessibilityIcon
} from '@material-ui/icons'
import './style.css'
const CategoryList = ({ categories, setCategoryId, handleDrawerClose }) => {
  return (
    <React.Fragment>
      <List>
        <ListItem button className="icon">
          <ListItemIcon ><BrushIcon /></ListItemIcon>
          <ListItemText>
            <Box>
              Artists
            </Box>
          </ListItemText>
        </ListItem>
        <ListItem button className="icon">
         <ListItemIcon><PhotoIcon /></ListItemIcon>
          <ListItemText>
            <Box>
              Artworks
            </Box>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button className="icon">
         <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
          <ListItemText>
            <Box>
              Orders
            </Box>
          </ListItemText>
        </ListItem>
        
        <ListItem button className="icon">
          <ListItemIcon><FaceIcon /></ListItemIcon>
          <ListItemText>
            <Box>
              Customers
            </Box>
          </ListItemText>
        </ListItem>
        
        
        
      </List>
      <Divider />
      <List>
        <ListItem button className="icon">
          <ListItemIcon><AccessibilityIcon /></ListItemIcon>
          <ListItemText>
            <Box>
              Staff
            </Box>
          </ListItemText>
        </ListItem>
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
