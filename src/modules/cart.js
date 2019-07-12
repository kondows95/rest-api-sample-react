/*global localStorage*/

const initialState = {
  rows: [],
  totalQuantity: 0,
  maxQuantity: 0,
  totalPrice: 0,
}

//=============================================================================
//　Reducer
//=============================================================================
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      _addCartItem(action.payload, state)
      return _updateState()
    case 'CART_FETCH_DATA':
      return _updateState()
    case 'CART_CHANGE_QUANTITY':
      _changeQuantity(state.rows, action.payload.itemId, action.payload.quantity)
      return _updateState()
    case 'CART_DELETE_ITEM':
      _deleteCartItem(state.rows, action.payload)
      return _updateState()
    case 'CART_CLEAR_CART':
        return initialState
    default:
      return state
  }
}

const _updateState = (state) => {
  const newState = {...state}
  newState.rows = []

  const jsonData = localStorage.getItem('cart')
  if (jsonData) {
    newState.rows = JSON.parse(jsonData)
  }
  

  let totalQuantity = 0
  let maxQuantity = 0
  let totalPrice = 0
  for (const row of newState.rows) {
    //calcurate about quantity
    const qty = row.quantity
    totalQuantity += qty
    if (qty > maxQuantity) {
      maxQuantity = qty
    }

    //Add subtotal column here.
    row.subTotal = row.price * qty

    //calcurate total price
    totalPrice += row.subTotal
    
  }
  newState.totalQuantity = totalQuantity
  newState.maxQuantity = maxQuantity
  newState.totalPrice = totalPrice

  return newState
}

const _addCartItem = (item, state) => {
  //Define cart item object
  const cartItem = {...item}
  cartItem.quantity = 1

  //All cart data
  const cartItems = [...state.rows]
  
  //count up if found the item.
  let found = false
  for (const row of cartItems) {
    if (row.id === cartItem.id) {
      row.quantity += 1
      found = true
      break
    }
  }

  //push the item if not found.
  if (!found) {
    cartItems.push(cartItem)
  }

  //store in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems) );
}

const _changeQuantity = (rows, itemId, quantity) => {
  //Set to 0 if quantity is less than 0.
  if (!quantity || quantity <= 0) {
    quantity = 0
  }

  //All cart data
  const cartItems = [...rows]

  //update quantity
  for (const row of cartItems) {
    if (row.id === itemId) {
      row.quantity = quantity
      break
    }
  }

  //store in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

//=============================================================================
//　ActionCreators
//=============================================================================
export const addCartItem = item => ({
  type: 'CART_ADD_ITEM',
  payload: item
})

export const fetchCartData = item => ({
  type: 'CART_FETCH_DATA'
})

export const deleteCartItem = itemId => ({
  type: 'CART_DELETE_ITEM',
  payload: itemId
})

const _deleteCartItem = (rows, itemId) => {
  //copy items except the itemId.
  const cartItems = []
  for (const row of rows) {
    if (row.id !== itemId) {
      cartItems.push({...row})
    }
  }

  //store in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

export const changeQuantity = (itemId, quantity) => ({
  type: 'CART_CHANGE_QUANTITY',
  payload: {itemId: itemId, quantity: parseInt(quantity)}
})
