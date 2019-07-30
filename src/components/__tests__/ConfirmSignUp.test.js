import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import CartTotal from '../CartTotal';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfirmSignUp from '../auth/ConfirmSignUp';

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
let authState="confirmSignUp" ;
const changeAuthState = jest.fn(()=>{
  authState ="Signup";
});
const loading =false;
const error = "Please enter confirmation code";
const email = "a@gmail.com";
const confirmSignUp = jest.fn((email,comfirmationCode) =>{
  let cod = comfirmationCode;
});
describe("ConfirmSingup component snapshot", () => {
  it('matches the snapshot', () => {
    const ConfirmSingupSnapshot = renderer.create(
        <ConfirmSignUp 
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        confirmSignUp = {confirmSignUp}
        />
    ).toJSON();
    expect(ConfirmSingupSnapshot).toMatchSnapshot();
  })
})

describe("Testing ConfirmSingup", () => {
  it('Testing textfied and confirm button', () => {
    act(() => {
      ReactDOM.render(  
      <ConfirmSignUp 
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        confirmSignUp = {confirmSignUp}
        />, container);
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], '1234');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[0].value).toBe('1234');
    const buttonArr = document.querySelectorAll('button');
    act(() => {
      buttonArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(confirmSignUp).toHaveBeenCalledWith("a@gmail.com","1234");
    act(() => {
      valueSetter.call(inputArr[0], '');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    const linkArr = document.querySelectorAll('a');
    act(() => {
      linkArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(confirmSignUp).toHaveBeenCalledWith("a@gmail.com","");
  })
})