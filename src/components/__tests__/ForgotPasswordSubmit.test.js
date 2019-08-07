import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import ForgotPasswordSubmit from '../auth/ForgotPasswordSubmit';

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
let authState = "forgotPasswordReset";
const changeAuthState = jest.fn((signIn) => {
  authState = signIn;
});
const loading = false;
const error = "Forgot password ";
let email = "a@gmail.com";
const forgotPasswordSubmit = jest.fn((email, code, password) => {
  let code1 = code;
});
describe("ForgotPasswordSubmit component snapshot", () => {
  it('matches the snapshot', () => {
    const ForgotPasswordSubmitSnapshot = renderer.create(
      <ForgotPasswordSubmit
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        forgotPasswordSubmit={forgotPasswordSubmit}
      />
    ).toJSON();
    expect(ForgotPasswordSubmitSnapshot).toMatchSnapshot();
  })
})
describe("Testing ForgotPasswordSubmit", () => {
  it('Testing textfied and  confirm button ', () => {
    act(() => {
      ReactDOM.render(
        <ForgotPasswordSubmit
          authState={authState}
          changeAuthState={changeAuthState}
          loading={loading}
          error={error}
          email={email}
          forgotPasswordSubmit={forgotPasswordSubmit}
        />, container);
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], '1234');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[0].value).toBe('1234');
    act(() => {
      valueSetter.call(inputArr[1], 'a1234');
      inputArr[1].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[1].value).toBe('a1234');
    const buttonArr = document.querySelectorAll('button');
    act(() => {
      buttonArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(forgotPasswordSubmit).toHaveBeenCalledWith("a@gmail.com","1234","a1234");
  })
})