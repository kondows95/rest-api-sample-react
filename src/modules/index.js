import { combineReducers } from 'redux';
import { categoriesReducer } from './categories';
import { itemsReducer } from './items';
import { cartReducer } from './cart';
import { ordersReducer} from './order';
import { authReducer } from './auth';
import { localeReducer } from './locale';

export default combineReducers({
  categories:　categoriesReducer,
  items: itemsReducer,
  cart: cartReducer,
  order: ordersReducer,
  auth: authReducer,
  locale: localeReducer,
})
