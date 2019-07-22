import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import Test from '../Test';
import TextField from '@material-ui/core/TextField'


let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

//test1
it('should exists email field', () => {
  act(() => {
    ReactDOM.render(<Test />, container);
  });
  
  const inputArr = container.querySelectorAll('Button')
  expect(inputArr).toHaveLength(1)
});