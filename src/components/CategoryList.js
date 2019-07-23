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

const CategoryList = ({ categories, saveCategory, deleteCategory }) => {
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
  
  const handleDelete = category => event => {
    setSelectedCategory(category)
    setDialogOpen(true)
    setIsDelete(true)
    setErrors({})
  }
  
  const handleEdit = category => event => {
    setSelectedCategory(category)
    setDialogOpen(true)
    setIsDelete(false)
    setErrors({})
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
  
  const deleteDialog = (selectedCategory && isDelete) ? (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog} 
      aria-labelledby="category-delete-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="category-delete-dialog">
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <Box>Do you really want to delete {selectedCategory.id}: {selectedCategory.name}.</Box>
        <Box fontWeight={600}></Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  ) : null
  
  const saveDialog = (selectedCategory && isDelete === false) ? (
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
        <Button id = "cancle" onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button id = "submit" onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  ) : null
  
  const paperItems = []
  for (const category of categories) {
    paperItems.push(
      <Grid key={category.id} item xs={12} sm={4} lg={3}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box fontWeight={600}>{category.id}: {category.name}</Box>
            <Box ml="auto" mr={0} mt={2}>
              <Button color="primary" onClick={handleEdit(category)}>
                Edit
              </Button>
              <Button color="primary" onClick={handleDelete(category)}>
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    )
  }
  
  const paperControl = (
    <Paper className={classes.paper}>
      <Box ml={0} my="auto" fontWeight={600}>
        Categories ({categories.length})
      </Box>
      <Button 
        id="create"
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
        <Grid container>
          {paperItems}
        </Grid>
      </Container>
      {saveDialog}
      {deleteDialog}
    </React.Fragment>
  )
}

const categoryPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(categoryPropTypes.isRequired).isRequired,
}

export default CategoryList
