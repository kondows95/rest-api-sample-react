import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import ForgotPassword from '../auth/ForgotPassword';

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
let authState = "forgotPassword";
const changeAuthState = jest.fn((signIn) => {
  authState = signIn;
});
const loading = false;
const error = "Forgot password ";
let email = "";
const forgotPassword = jest.fn((email) => {
  email = email;
});
describe("ForgotPassword component snapshot", () => {
  it('matches the snapshot', () => {
    const ForgotPasswordSnapshot = renderer.create(
      <ForgotPassword
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        forgotPassword={forgotPassword}
      />
    ).toJSON();
    expect(ForgotPasswordSnapshot).toMatchSnapshot();
  })
})

describe("Testing ForgotPassword", () => {
  it('Testing textfied and  Send Code button ', () => {
    act(() => {
      ReactDOM.render(  
        <ForgotPassword
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        forgotPassword={forgotPassword}
      />, container);
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], 'a@gmail.com');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[0].value).toBe('a@gmail.com');
    const buttonArr = document.querySelectorAll('button');
    act(() => {
      buttonArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(forgotPassword).toHaveBeenCalledWith("a@gmail.com");
    const linkArr = document.querySelectorAll('a');
    act(() => {
      linkArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(changeAuthState).toHaveBeenCalledWith("signIn");
  })
})