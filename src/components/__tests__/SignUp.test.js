import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

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
let authState = "signUp";
const changeAuthState = jest.fn((data) => {
  authState = data;
});
const loading = false;
const error = "";
const signUp = jest.fn((email1, password1) => {
  let email = email1;
  let password = password1;
});
describe("SignUp component snapshot", () => {
  it('matches the snapshot', () => {
    const SignUpSnapshot = renderer.create(
      <SignUp
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        signUp={signUp}
      />
    ).toJSON();
    expect(SignUpSnapshot).toMatchSnapshot();
  });
});


describe("Testing SignUp", () => {
    it('Testing textfied and  SignUp button ', () => {
      act(() => {
        ReactDOM.render(
            <SignUp
            authState={authState}
            changeAuthState={changeAuthState}
            loading={loading}
            error={error}
            signUp={signUp}
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
      expect(signUp).toHaveBeenCalledWith("a@gmail.com", "1234");
    })
    it("Testing two link ", () => {
      act(() => {
        ReactDOM.render(
          <SignUp
            authState={authState}
            changeAuthState={changeAuthState}
            loading={loading}
            error={error}
            signUp={signUp}
          />, container);
      });
      const linkArr = document.querySelectorAll('a');
      act(() => {
        linkArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      expect(changeAuthState).toHaveBeenCalledWith("signIn");
    });
  });
  