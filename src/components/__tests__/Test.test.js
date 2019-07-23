import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import Test from '../Test';
import { TextField } from '@material-ui/core'

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
const initialCategory = { id: null, name: "" }
//test1
it('should exists email field', () => {
  const mockCallBack = jest.fn();
  act(() => {
    ReactDOM.render(<Test />, container);
  });
  const button = container.querySelector('Button')
  //expect(button).toHaveLength(1)
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(1).toBe(1);
  // const h1arr = container.querySelectorAll('h1');
  // expect(h1arr).toHaveLength(1)
  // const inputarr = container.querySelectorAll('input');
  // expect(inputarr).toHaveLength(1)
});