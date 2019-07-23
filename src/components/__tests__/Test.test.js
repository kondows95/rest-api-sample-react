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
  document.body.outerHTML = '<body></body>'
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

  const button = container.querySelectorAll('Button')
  expect(button).toHaveLength(1)
  //click create button 
  act(() => {
    button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const inputArr = document.querySelectorAll('input');
  expect(inputArr).toHaveLength(1);
  expect(inputArr[0].id).toBe("name");
  //enter value to textfield
  act(() => {
    valueSetter.call(inputArr[0], 'abc');
    inputArr[0].dispatchEvent(new Event('change', { bubbles: true}));
  });
  expect(inputArr[0].value).toBe('abc');

  const buttonArray = container.querySelectorAll('button');
  act(() => {
    buttonArray[0].dispatchEvent(new Event('click', { bubbles: true}))
  })
  expect(inputArr[0].value).toBe("");

 
});