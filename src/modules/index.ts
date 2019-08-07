import { combineReducers } from 'redux';
import { categoriesReducer } from './categories';
import { itemsReducer } from './items';
import { cartReducer } from './cart';
import { ordersReducer} from './order';
import { authReducer } from './auth';
import { localeReducer } from './locale';
import { ordersListReducer } from './orderList';

export default combineReducers({
  categories:　categoriesReducer,
  items: itemsReducer,
  cart: cartReducer,
  order: ordersReducer,
  orderList: ordersListReducer,
  auth: authReducer,
  locale: localeReducer,
})
