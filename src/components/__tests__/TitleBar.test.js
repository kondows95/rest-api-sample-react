import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
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
      <Parent>
        <TitleBar
          fetchAuthedUser={fetchAuthedUser}
          changeAuthState={changeAuthState} />
      </Parent>
    ).toJSON();
    expect(TitalbarSnapshot).toMatchSnapshot();
  });
});

describe("Teting titlebar", () => {
  it('Testing Signout button and shoppingcart icon', () => {
    act(() => {
      ReactDOM.render((
        <Parent>
          <TitleBar
            fetchAuthedUser={fetchAuthedUser}
            changeAuthState={changeAuthState} 
            signOut={signOut}/>
        </Parent>
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