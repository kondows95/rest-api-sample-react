import { combineReducers } from 'redux'
import { categoriesReducer } from './categories'

export default combineReducers({
  categories:　categoriesReducer,
})
