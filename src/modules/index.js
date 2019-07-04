import { combineReducers } from 'redux'
import { categoriesReducer } from './categories'
import { itemsReducer } from './items'

export default combineReducers({
  categories:　categoriesReducer,
  items: itemsReducer
})
