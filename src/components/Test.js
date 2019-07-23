import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Box, Container, Paper, Grid, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
} from '@material-ui/core'
import { validateForm } from '../util'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: 0,
    marginLeft: "auto",
  },
  paper: {
    display: 'flex',
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 2),
  },
}))

const Test = ({ categories, saveCategory, deleteCategory }) => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [isDelete, setIsDelete] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  
  const initialCategory = {id: null, name: ""}
  
 
  const handleChangeValue = fieldName => event => {
    const newCategory = {...selectedCategory}
    newCategory[fieldName] =  event.target.value
    setSelectedCategory(newCategory)
  }
  
  const handleEdit = category => event => {
    console.log("this is handle")
    setSelectedCategory(category)
    setDialogOpen(true)
    setIsDelete(false)
    setErrors({})
    console.log("selected category is ",selectedCategory)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedCategory(null)
  }
  
  const validationSetting = {
    isEmpty: ['name'],
  }
  
  const handleSubmit = () => {
    if (selectedCategory) {
      const errs = validateForm(validationSetting, selectedCategory)
      if (errs) {
        setErrors(errs)
      }
      else {
        if (isDelete) {
          deleteCategory(selectedCategory.id)
        }
        else {
          saveCategory(selectedCategory)
        }
        handleCloseDialog()
      }
    }
  }
  
  
  const saveDialog = (selectedCategory && isDelete === false) ? 
  (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog} 
      aria-labelledby="category-save-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="category-save-dialog" >
        {selectedCategory.id ? "Edit (ID:"+selectedCategory.id+")" : "Create"}
      </DialogTitle>
      <DialogContent>
        <h1>This</h1>
        <TextField
          variant="outlined"
          autoFocus
          error={errors.name ? true : false}
          id="name"
          label="Name"
          value={selectedCategory.name}
          onChange={handleChangeValue("name")}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  ) 
  : 
 null
  
  
  const paperControl = (
    <Paper className={classes.paper}>
      <Box ml={0} my="auto" fontWeight={600}>
        Categories 
      </Box>
      <Button 
        variant="contained" 
        color="secondary" 
        className={classes.button}
        onClick={handleEdit(initialCategory)}
      >
        Create
      </Button>
    </Paper>
  )
  
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        {paperControl}
      </Container>
      {saveDialog}
    </React.Fragment>
  )
}

const categoryPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

Test.propTypes = {
  categories: PropTypes.arrayOf(categoryPropTypes.isRequired).isRequired,
}

export default Test
