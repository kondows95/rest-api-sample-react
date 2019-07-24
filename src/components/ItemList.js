import React from 'react'
//import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box, Paper, Container, Grid, CardMedia, Card, CardActions, CardContent, Button, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions, IconButton, NativeSelect
} from '@material-ui/core'
import { AddShoppingCart as AddShoppingCartIcon, AddPhotoAlternate as AddPhotoIcon } from '@material-ui/icons'
import { validateForm } from '../util'
import { BASEURL_ITEM_IMAGES } from '../constants'
import InfiniteScroll from 'react-infinite-scroller'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const uuidv1 = require('uuid/v1');

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
    height: 45
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  controlButton: {
    marginRight: 0,
    marginLeft: theme.spacing(2),
     marginTop: theme.spacing(1),
    height: 40
  },
  paper: {
    display: 'flex',
    margin: theme.spacing(2, 1),
    padding: theme.spacing(2, 2),
  },
  itemImgBox: {
    width: '100%',
    maxHeight: 230,
    minHeight: 180,
    borderWidth: "1px",
    borderStyle: "dotted",
    borderRadius: 4

  },
  itemImg: {
    maxWidth: '100%',
    maxHeight: 210,
    borderRadius: 4,
    resizeMode: 'contain',
    cursor: 'pointer',
  },
  defaultImg: {
    width: 85,
    height: 85,
    borderRadius: 4,
    color: '#cfcfcf',
    cursor: 'pointer',
  },
  btnPicker: {
    padding: '10px',
    background: 'tomato',
    color: '#fff',
    borderRadius: 4,
    cursor: 'pointer',
  },
  labelCategory: {
    margin: theme.spacing(1,2)
  },
  btnWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  btnProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))


const ItemList = ({ items, categories, saveItem, deleteItem, addCartItem, setCategoryId, fetchAllItems, noMoreFetch, uploadImage, user, changeAuthState, history }) => {
  const classes = useStyles()

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const [selectedImg, setSelectedImg] = React.useState(null)
  const [isDelete, setIsDelete] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [isLogin, setIsLogin] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  
  const timer = React.useRef();
  React.useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);
  
  const inputFile = React.useRef(null) ;
  
  const initialItem = { id: null, name: "", price: "", category_id: "" }

  const handleChangeValue = fieldName => event => {
    const newItem = { ...selectedItem }
    newItem[fieldName] = event.target.value
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
    setSelectedImg(null)
    setErrors({})
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSpinner(false);
    setIsLogin(false);
    setSelectedImg(null);
    setFile(null);
    setFileName(null);
  }
  
  const handleBrowseOpen = (e) => {
    inputFile.current.click();
  }

  const handleChooseFile = event => {
    event.preventDefault();
    
    let reader = new FileReader();
    let file = event.target.files[0];
    
    //create dynamic name
    const fname = uuidv1()+".png";
    
    //add file name in state
    const newItem = { ...selectedItem }
    newItem['image'] = fname;
    setSelectedItem(newItem);
    
    setFile(file);
    setFileName(fname);
    
    //get url img for preview
    reader.onloadend = () => {
      setSelectedImg(reader.result)
    }
    reader.readAsDataURL(file);
  
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    
    const errs = validateForm(validationSetting, selectedItem)
    console.log('###handleSubmit###', errs)
    
    if (errs) {
      setErrors(errs)
    }
    else {
      if (isDelete) {
        setSpinner(true);
        deleteItem(selectedItem.id);
      }
      else {
        
        if(user === null){
          setIsLogin(true);
        }else{
          setIsLogin(false);
          setSpinner(true);
          
          //console.log(selectedItem);
          saveItem(selectedItem, fileName, file);
        }
        
      }
      
      timer.current = setTimeout(() => {
        
        setSpinner(false);
        handleCloseDialog();
        //window.location.reload();
      }, 3000);
    }

  }

  const validationSetting = {
    isEmpty: ['name', 'price', 'category_id'],
    isNumeric: ['price']
  }
  
  const handleLogin = event => {
    event.preventDefault();
    changeAuthState('signIn')
    history.push("/login");
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
        {selectedItem.id ? "Edit (ID:" + selectedItem.id + ")" : "Create"}
        {isLogin ? <Box color="red" >You don't have Upload Permission. <Button onClick={handleLogin} color="secondary" >sign in</Button></Box> : null}
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
        
        <FormControl>
          <InputLabel htmlFor="category" className={classes.labelCategory}>
            Category
          </InputLabel>
          <NativeSelect
            value={selectedItem.category_id}
            onChange={handleChangeValue("category_id")}
            className={classes.inputField}
            error={errors.category_id ? true : false}
            input={<OutlinedInput labelWidth={70} name="category" id="category" />}
          >
            <option value=""></option>
            {categories.map((category) => {
              return (<option value={category.id}>{category.name}</option>)
            })}
          </NativeSelect>
        </FormControl>
        
        <Grid>
          {selectedItem.id === null ?
            <Grid>
                <Box textAlign="center"  p={1} my={2} className={classes.itemImgBox} >
                  {selectedImg === null ? 
                    <Box textAlign="center" pt={1}>
                      <Box><AddPhotoIcon className={classes.defaultImg} onClick={() => handleBrowseOpen()} /></Box>
                      <label className={classes.btnPicker}>
                        <TextField onChange={handleChooseFile} type="file" id="file" name="file" ref={inputFile} style={{ display: 'none' }} ></TextField>
                        Choose File
                      </label>
                    </Box>
                    : 
                    <Box>
                      <img src={selectedImg} onClick={() => handleBrowseOpen()} className={classes.itemImg} alt={selectedItem.image}  />
                      <label>
                        <TextField onChange={handleChooseFile} type="file" id="file" name="file" ref={inputFile} style={{ display: 'none' }} ></TextField>
                      </label>
                    </Box>
                  }
                </Box>
            </Grid>
            :
            <Grid>
              <Box textAlign="center"  p={1} my={2} className={classes.itemImgBox} >
                <img src={ selectedImg ? selectedImg : BASEURL_ITEM_IMAGES + selectedItem.image} onClick={() => handleBrowseOpen()} alt={selectedItem.image} className={classes.itemImg} />
                <label>
                  <TextField onChange={handleChooseFile} type="file" id="file" name="file" ref={inputFile} style={{ display: 'none' }} ></TextField>
                </label>
              </Box>
            </Grid>
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Box className={classes.btnWrapper} >
          <Button onClick={handleSubmit} disabled={spinner} color="primary" variant="contained">
            { isDelete ? 'Delete' : 'Submit' }
          </Button>
          {spinner && <CircularProgress size={24} className={classes.btnProgress} />}
        </Box>
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
            image={BASEURL_ITEM_IMAGES + item.image}
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
        className={classes.inputField+ ' ' +classes.controlButton}
        error={errors.category_id ? true : false}
        onChange={handleChangeCategory}
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => {
          return (<option value={category.id} key={index}>{category.name}</option>)
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

ItemList.propTypes = {
  changeAuthState: PropTypes.func.isRequired,
}

export default withRouter(ItemList);
