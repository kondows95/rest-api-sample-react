import { combineReducers } from 'redux'
import { categoriesReducer } from './categories'
import { itemsReducer } from './items'
import { cartReducer } from './cart'
import {ordersReducer} from './order';

export default combineReducers({
  categories:　categoriesReducer,
  items: itemsReducer,
  cart: cartReducer,
  order:ordersReducer,
})
