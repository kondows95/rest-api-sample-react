import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box, Container, Paper, Grid, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from '@material-ui/core'
import { validateForm } from '../util';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

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
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '200px',
  },
}))

const CategoryList = ({
  categories,
  saveCategory,
  deleteCategory,
  loading,
  closeDialog,
  dialogBox, }) => {
  const classes = useStyles()
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [isDelete, setIsDelete] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const initialCategory = { id: null, name: "" }

  const handleChangeValue = fieldName => event => {
    const newCategory = { ...selectedCategory }
    newCategory[fieldName] = event.target.value
    setSelectedCategory(newCategory)
  }

  const handleDelete = category => event => {
    dialogBox(true);
    setSelectedCategory(category)
    setIsDelete(true)
    setErrors({})
  }

  const handleEdit = category => event => {
    dialogBox(true);
    setSelectedCategory(category)
    setIsDelete(false)
    setErrors({})
  }

  const handleCloseDialog = () => {
    dialogBox(false);
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
      }
    }
  }

  const deleteDialog = (selectedCategory && isDelete) ? (
    <Dialog
      open={closeDialog}
      onClose={handleCloseDialog}
      aria-labelledby="category-delete-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="category-delete-dialog">
        <FormattedMessage id="Confirm.TextTitle" defualtMessage="Are you sure?" />
      </DialogTitle>
      <DialogContent>
        <Box>
          <FormattedMessage id="Confirm.TextBody" defualtMessage="Do you really want to delete" />
          {selectedCategory.id}: {selectedCategory.name}.
        </Box>
        <Box fontWeight={600}></Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          <FormattedMessage id="Button.Cancel" defualtMessage="Cancel" />
        </Button>
        <Box className={classes.wrapper} >
          <Button onClick={handleSubmit} disabled={loading} color="primary">
            <FormattedMessage id="Button.Delete" defualtMessage="Delete" />
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Box>
      </DialogActions>
    </Dialog>
  ) : null

  const saveDialog = (selectedCategory && isDelete === false) ? (
    <Dialog
      open={closeDialog}
      onClose={handleCloseDialog}
      aria-labelledby="category-save-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="category-save-dialog" >
        {selectedCategory.id ?
          <Box> <FormattedMessage id="Button.Edit" defualtMessage="Edit" /> (ID: {selectedCategory.id} )</Box>
          :
          <FormattedMessage id="Button.Create" defualtMessage="Create" />
        }
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

        <Button onClick={handleCloseDialog} color="primary">
          <FormattedMessage id="Button.Cancel" defualtMessage="Cancel" />
        </Button>
        <Box className={classes.wrapper} >
          <Button onClick={handleSubmit} color="primary">
            <FormattedMessage id="Button.Submit" defualtMessage="Submit" />
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Box>
      </DialogActions>
    </Dialog>
  ) : null

  const paperItems = []
  for (const category of categories) {
    paperItems.push(
      <Grid item xs={12} sm={4} lg={3} key={category.id} >
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Box fontWeight={600}>{category.id}: {category.name}</Box>
            <Box ml="auto" mr={0} mt={2}>
              <Button color="primary" onClick={handleEdit(category)}>
                <FormattedMessage id="Button.Edit" defualtMessage="Edit" />
              </Button>
              <Button color="primary" onClick={handleDelete(category)}>
                <FormattedMessage id="Button.Delete" defualtMessage="Delete" />
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
        <FormattedMessage id="Menu.Category" defualtMessage="Category" />({categories.length})
      </Box>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleEdit(initialCategory)}
      >
        <FormattedMessage id="Button.Create" defualtMessage="Create" />
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
      {loading &&
          <Grid container justify="center" className={classes.root}>
            <Grid className={classes.wrapper}>
              <img src={require("../assets/img/spinner.gif")} width={50} height={50} alt="spinner"/>
            </Grid>
          </Grid>
        }
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
