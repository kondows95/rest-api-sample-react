import rootReducer from './modules/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
export default createStore(rootReducer, applyMiddleware(thunk));