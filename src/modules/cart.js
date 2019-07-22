import { async } from "q";

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
      return _updateState({
        ...state,
        rows: action.payload,
      })
    case 'CART_FETCH_DATA':
      return _updateState({
        ...state,
        rows:action.payload})
    case 'CART_CHANGE_QUANTITY':
      return _updateState({
        ...state,
        rows: action.payload,
      })
    case 'CART_DELETE_ITEM':
      return _updateState({
        ...state,
        rows: action.payload,
      })
    case 'CART_CLEAR_CART':
      return initialState
    default:
      return state
  }
}

const _updateState = (state) => {
  const newState = { ...state }
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


//=============================================================================
//　ActionCreators
//=============================================================================

export const addCartItem = (item) => {
  return (dispatch, getState) => {
    //Define cart item object
    const cartItem = { ...item }
    cartItem.quantity = 1
    //All cart data
    const cartItems = [...getState().cart.rows]
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
    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: cartItems
    })
  }
}

export const fetchCartData = () => {
  return (dispatch) => {
    const jsonData = localStorage.getItem('cart')
    let rows = [];
    if (jsonData) {
      rows = JSON.parse(jsonData)
    }
    dispatch({
      type: 'CART_FETCH_DATA',
      payload: rows
    })
  }
}
export const deleteCartItem = itemId => {
  return (dispatch, getState) => {
    const cartItems = [];
    const rows = [...getState().cart.rows];
    for (const row of rows) {
      if (row.id !== itemId) {
        cartItems.push({ ...row })
      }
    }
    //store in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch({
      type: 'CART_DELETE_ITEM',
      payload: cartItems
    })
  }

}

export const changeQuantity = (itemId, quantity) => {
  return (dispatch, getState) => {
    if (!quantity || quantity <= 0) {
      quantity = 0
    }

    //All cart data
    const cartItems = [...getState().cart.rows]

    //update quantity
    for (const row of cartItems) {
      if (row.id === itemId) {
        row.quantity = quantity
        break
      }
    }
    //store in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch({
      type: 'CART_CHANGE_QUANTITY',
      payload: cartItems
    })
  }
}


