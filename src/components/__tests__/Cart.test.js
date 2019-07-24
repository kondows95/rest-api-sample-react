import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Cart from '../Cart';

import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../store';

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null
})

it('test', () => {
    act(() => {
      ReactDOM.render((
        <Provider store={store}>
          <Router>
            <Cart />
          </Router>
        </Provider>
      ), container);
    });
    
   const button = document.querySelectorAll('TitleBar')
   console.log("buttons are ", button[0]);
  });