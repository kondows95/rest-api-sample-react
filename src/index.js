import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import rootReducer from './modules'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'
const store = createStore(rootReducer, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.register();