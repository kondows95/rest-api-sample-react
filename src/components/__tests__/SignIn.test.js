import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import SignIn from '../auth/SignIn';

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
let authState = "signIn";
const changeAuthState = jest.fn((data) => {
  authState = data;
});
const loading = false;
const error = "";
const signIn = jest.fn((email1, password1) => {
  let email = email1;
  let password = password1;
});
describe("SignIn component snapshot", () => {
  it('matches the snapshot', () => {
    const SignInSnapshot = renderer.create(
      <SignIn
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        signIn={signIn}
      />
    ).toJSON();
    expect(SignInSnapshot).toMatchSnapshot();
  });
});

describe("Testing SignIn", () => {
  it('Testing textfied and  SignIn button ', () => {
    act(() => {
      ReactDOM.render(
        <SignIn
          authState={authState}
          changeAuthState={changeAuthState}
          loading={loading}
          error={error}
          signIn={signIn}
        />, container);
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], 'a@gmail.com');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[0].value).toBe('a@gmail.com');
    act(() => {
      valueSetter.call(inputArr[1], '1234');
      inputArr[1].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[1].value).toBe('1234');
    const buttonArr = document.querySelectorAll('button');
    act(() => {
      buttonArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(signIn).toHaveBeenCalledWith("a@gmail.com", "1234");
  })
  it("Testing two link ", () => {
    act(() => {
      ReactDOM.render(
        <SignIn
          authState={authState}
          changeAuthState={changeAuthState}
          loading={loading}
          error={error}
          signIn={signIn}
        />, container);
    });
    const linkArr = document.querySelectorAll('a');
    act(() => {
      linkArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(changeAuthState).toHaveBeenCalledWith("forgotPassword");
    act(() => {
      linkArr[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(changeAuthState).toHaveBeenCalledWith("signUp");
  });
});
