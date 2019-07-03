import { combineReducers } from 'redux'
import { categoriesReducer } from './categories'
import { customersReducer } from './customers'
import { itemsReducer } from './items'

export default combineReducers({
  categories:　categoriesReducer,
  customers: customersReducer,
  items: itemsReducer
})
