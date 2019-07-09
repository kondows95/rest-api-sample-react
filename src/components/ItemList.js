import React from 'react'
//import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Paper, Container, Grid, CardMedia,Card, CardActions, CardContent,Button, Dialog, 
  DialogTitle,DialogContent, TextField, DialogActions, IconButton, NativeSelect
} from '@material-ui/core'
import { AddShoppingCart as AddShoppingCartIcon } from '@material-ui/icons'
import { validateForm } from '../util'
import { BASEURL_ITEM_IMAGES } from '../constants'
import InfiniteScroll from 'react-infinite-scroller'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9
    paddingTop: '128%',
  },
  cardAction: {
    display: 'flex',
    margin: theme.spacing(0, 1),
  },
  inputField: {
    margin: theme.spacing(2, 0),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  controlButton: {
    marginRight: 0,
    marginLeft: theme.spacing(2),
  },
  paper: {
    display: 'flex',
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 2),
  },
}))


const ItemList = ({ items, categories, saveItem, deleteItem, addCartItem, setCategoryId, fetchAllItems, noMoreFetch }) => {
  const classes = useStyles()

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const [isDelete, setIsDelete] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  
  const initialItem = {id: null, name: "", price: "", category_id: ""}

  const handleChangeValue = fieldName => event => {
    const newItem = {...selectedItem}
    newItem[fieldName] =  event.target.value
    setSelectedItem(newItem)
  }
  
  const handleDelete = item => event => {
    setSelectedItem(item)
    setDialogOpen(true)
    setIsDelete(true)
    setErrors({})
  }
  
  const handleEdit = item => event => {
    setSelectedItem(item)
    setDialogOpen(true)
    setIsDelete(false)
    setErrors({})
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  
  const validationSetting = {
    isEmpty: ['name', 'price', 'category_id'],
    isNumeric: ['price']
  }
  
  const handleSubmit = () => {
    if (selectedItem) {
      const errs = validateForm(validationSetting, selectedItem)
      console.log('###handleSubmit###', errs)
      if (errs) {
        setErrors(errs)
      }
      else {
        if (isDelete) {
          deleteItem(selectedItem.id)
        }
        else {
          saveItem(selectedItem)
        }
        handleCloseDialog()
      }
    }
  }
  
  const handleAddCartItem = item => event => {
    addCartItem(item)
  }
  
  const handleChangeCategory = event => {
    setCategoryId(event.target.value ? event.target.value : null)
  }
  
  const dialog = (selectedItem === null) ? null : (
    <Dialog 
      open={dialogOpen} 
      onClose={handleCloseDialog} 
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">
        {selectedItem.id ? "Edit (ID:"+selectedItem.id+")" : "Create"}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          fullWidth
          variant="outlined"
          error={errors.name ? true : false}
          id="name"
          label="Name"
          value={selectedItem.name}
          onChange={handleChangeValue("name")}
          margin="dense"
          className={classes.inputField}
        />
        <TextField
          fullWidth
          variant="outlined"
          error={errors.price ? true : false}
          id="name"
          label="Price"
          value={selectedItem.price}
          onChange={handleChangeValue("price")}
          margin="dense"
          className={classes.inputField}
        />
        <NativeSelect
          value={selectedItem.category_id}
          onChange={handleChangeValue("category_id")}
          className={classes.inputField}
          error={errors.category_id ? true : false}
        >
          <option value=""></option>
          {categories.map((category) => {
            return (<option value={category.id}>{category.name}</option>)
          })}
        </NativeSelect>
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
  
  
  const paperItems = []
  for (const item of items) {
    paperItems.push(
      <Grid item xs={12} sm={4} lg={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={BASEURL_ITEM_IMAGES+item.image}
            title={item.name}
          />
          <CardContent >
            <Box fontWeight={600}>
             {item.name}
            </Box>
            <Box>
              {item.price} Ks
            </Box>
          </CardContent>
          <CardActions className={classes.cardAction}>
            <Box ml={0} mr="auto">
              <IconButton onClick={handleAddCartItem(item)}>
                <AddShoppingCartIcon />
              </IconButton>
            </Box>
            <Box ml="auto" mr={0}>
              <Button color="primary" onClick={handleEdit(item)}>
                Edit
              </Button>
              <Button color="primary" onClick={handleDelete(item)}>
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    )
  }
  
  const paperControl = (
    <Paper className={classes.paper}>
      <Box ml={0} my="auto" flexGrow={1} fontWeight={600}>
        Items ({items.length})
      </Box>
      <NativeSelect
        className={classes.inputField}
        error={errors.category_id ? true : false}
        onChange={handleChangeCategory}
        className={classes.controlButton}
      >
        <option value="">All Categories</option>
        {categories.map((category) => {
          return (<option value={category.id}>{category.name}</option>)
        })}
      </NativeSelect>
      <Button 
        variant="contained" 
        color="secondary" 
        className={classes.controlButton}
        onClick={handleEdit(initialItem)}
      >
        Create
      </Button>
    </Paper>
  )

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchAllItems}
      hasMore={!noMoreFetch}
      initialLoad={true}
      loader={<div className="loader" key={0}></div>}
    >
      <Container maxWidth="lg">
        {paperControl}
        <Grid container>
          {paperItems}
        </Grid>
        {dialog}
      </Container>
    </InfiniteScroll>
  )
}

export default ItemList
