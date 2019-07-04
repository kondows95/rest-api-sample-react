import React from 'react'
//import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid, CardMedia,Card, CardActions, CardContent,Button, Dialog, 
DialogTitle,DialogContent, TextField, DialogActions, Select, MenuItem, FilledInput } from '@material-ui/core'
import { BASEURL_ITEM_IMAGES } from '../constants'


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
    marginLeft: theme.spacing(1),
    marginRight:theme.spacing(1),
  },
  
  
  paper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    marginRight:theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  itemBox: {
    marginLeft: theme.spacing(1),
    marginRight:theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  image: {
    width: 60,
    height: 96,
  }
}))
/*
          
          
*/

const ItemList = ({ items, categories, updateItem }) => {
  const classes = useStyles()
  
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedItem, selectItem] = React.useState(null)

  const handleChangeValue = fieldName => event => {
    const newItem = {...selectedItem}
    newItem[fieldName] =  event.target.value
    console.log(newItem)
    selectItem(newItem)
  }
  
  const handleEdit = item => event => {
    selectItem(item)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }
  
  const handleSubmit = () => {
    updateItem(selectedItem.id, selectedItem)
  }
  
  const dialog = (selectedItem === null) ? null : (
    <Dialog open={dialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          value={selectedItem.name}
          onChange={handleChangeValue("name")}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          value={selectedItem.price}
          onChange={handleChangeValue("price")}
          fullWidth
        />
        <Select
          value={selectedItem.category_id}
          onChange={handleChangeValue("category_id")}
          input={<FilledInput name="category_id" id="filled-category_id-simple" />}
        >
          <MenuItem value={1}>DummyCategory1</MenuItem>
          <MenuItem value={2}>DummyCategory2</MenuItem>
          <MenuItem value={3}>DummyCategory3</MenuItem>
          <MenuItem value={4}>DummyCategory4</MenuItem>
          <MenuItem value={5}>DummyCategory5</MenuItem>
          <MenuItem value={6}>DummyCategory6</MenuItem>
      </Select>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
  
  
  const paperItems = []
  for (const item of items) {
    paperItems.push(
      <Grid item xs={6} sm={4} lg={3}>
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
            <Box ml="auto">
              <Button color="primary" onClick={handleEdit(item)}>
                Edit
              </Button>
            </Box>
            <Box ml="auto" mr={0}>
              <Button color="primary">
                Delete
              </Button>
            </Box>
          </CardActions>

          
          
          
          
        </Card>
      </Grid>
    )
  }
  

  return (
    <Container maxWidth="lg">
      <Grid container>
        {paperItems}
      </Grid>
      {dialog}
    </Container>
  )
}

export default ItemList
