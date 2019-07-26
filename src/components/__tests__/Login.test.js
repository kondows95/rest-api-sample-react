import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store from '../../store';
import Login from '../Login';
import { exportSpecifier } from '@babel/types';
let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null
})
const user ={
  id : 1,
  email : "wintshweyee@gmail.com"
}
let fetchUser =[];

const fetchAuthedUser = jest.fn(() =>{
  fetchUser =[{id:1,email:"wintshweyee@gmail.com"},{id:2,email :"aye@gmail.com"}]
});
const changeAuthState = jest.fn(() => {
   let auth = true;
})
const history ={push : jest.fn()}
describe("Header component", () => {
  it('matches the snapshot1', () => {
    const HeaderSnapshot = renderer.create(
      <Provider store={store}>
        <Router>
          <Login 
          user ={null}
          fetchAuthedUser={fetchAuthedUser}
          />
        </Router>
      </Provider>
    ).toJSON();
    expect(HeaderSnapshot).toMatchSnapshot();
  });
  it('matches the snapshot2', () => {
    const HeaderwithUserSnapshot = renderer.create(
      <Provider store={store}>
        <Router>
          <Login 
          user ={user}
          fetchAuthedUser={fetchAuthedUser}/>
        </Router>
      </Provider>
    ).toJSON();
    expect(HeaderwithUserSnapshot).toMatchSnapshot();
  });
});

describe("testing login page ", () => {
  it('testing with no user', () => {
    act(() => {
      ReactDOM.render((
        <Provider store={store}>
        <Router>
          <Login 
          user ={null}
          fetchAuthedUser={fetchAuthedUser}
          history={history}
          changeAuthState={changeAuthState}
          />
        </Router>
      </Provider>
      ), container);
    });
    const buttonArr = document.querySelectorAll('Button');
    expect(buttonArr[0].textContent.toUpperCase()).toBe("SIGN IN");
    act(() =>{
      buttonArr[0].dispatchEvent(new Event('click', { bubbles: true }))
    })
    expect(changeAuthState).toHaveBeenCalled();
  })
  it('testing with  user', () => {
    act(() => {
      ReactDOM.render((
        <Provider store={store}>
        <Router>
          <Login 
          user ={user}
          fetchAuthedUser={fetchAuthedUser}
          history={history}
          changeAuthState={changeAuthState}
          />
        </Router>
      </Provider>
      ), container);
    });
    const buttonArr = document.querySelectorAll('Button');
    expect(buttonArr[0].textContent.toUpperCase()).toBe("SHOPPING");
    act(() =>{
      buttonArr[0].dispatchEvent(new Event('click', { bubbles: true }))
    })
  })
})