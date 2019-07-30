import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store from '../../store';
import TitleBar from '../TitleBar';
let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null
})
const fetchAuthedUser = jest.fn(() => {
  let user = [{ id: 1, emali: "a@gmail.com" }];
});
const changeAuthState = jest.fn(() => {
  let auth = ture;
});
const signOut = jest.fn(()=>{
  let auth=false;
});
describe("Titalbar component", () => {
  it('matches the snapshot', () => {
    const TitalbarSnapshot= renderer.create(
      <Provider store={store}>
        <Router>
          <TitleBar
            fetchAuthedUser={fetchAuthedUser}
            changeAuthState={changeAuthState} />
        </Router>
      </Provider>
    ).toJSON();
    expect(TitalbarSnapshot).toMatchSnapshot();
  });
});

describe("Teting titlebar", () => {
  it('Testing Signout button and shoppingcart icon', () => {
    act(() => {
      ReactDOM.render((
        <Provider store={store}>
        <Router>
          <TitleBar
            fetchAuthedUser={fetchAuthedUser}
            changeAuthState={changeAuthState} 
            signOut={signOut}/>
        </Router>
      </Provider>
      ), container);
      const linkArr = document.querySelectorAll('a');
      act(() => {
        linkArr[0].dispatchEvent(new Event('click', { bubbles: true }))
      });
      expect(linkArr[0].getAttribute("href")).toBe("/cart")
    });
  // cannot test becauseof  <Hidden /> but comment <Hidden/> the following testing work
  //   const ButtonArr = document.querySelectorAll('button');
  //   act(() => {
  //     ButtonArr[1].dispatchEvent(new Event('click', { bubbles: true }))
  //   });
  //  expect(signOut).toHaveBeenCalled();
  //  act(() => {
  //   ButtonArr[2].dispatchEvent(new Event('click', { bubbles: true }))
  // });
  // expect(signOut).toHaveBeenCalled();
   });
});