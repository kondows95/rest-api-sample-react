import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ConfirmOrder from '../ConfirmOrder';
import { Provider } from 'react-redux'
import store from '../../store';
import { createBrowserHistory } from 'history';
import { jsxEmptyExpression } from '@babel/types';
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
const requestParams = {
  first_name: "wint",
  last_name: "shwe yee",
  address1: "ye mon taung",
  address2: "mandalay",
  country: "myanmar",
  state: "mandalay",
  city: "mandalay"
}
const postResultObj = {
  id: 5,
  total_price: 50000
}
const history = { push: jest.fn() };
const postOrder =jest.fn(() => {
});
describe("Confirm Order component", () => {
  it('matches the snapshot', () => {
    const ComfirmOrderSnapshotWithPostObj = renderer.create(
      <Provider store={store}>
        <Router>
          <ConfirmOrder
            requestParams={requestParams}
            postResultObj={postResultObj}
          />
        </Router>
      </Provider>
    ).toJSON();
    expect(ComfirmOrderSnapshotWithPostObj).toMatchSnapshot();
  });
  it('matches the snapshot', () => {
    const ComfirmOrderSnapshot = renderer.create(
      <Provider store={store}>
        <Router>
          <ConfirmOrder
            requestParams={requestParams}
            postResultObj={null}
          />
        </Router>
      </Provider>
    ).toJSON();
    expect(ComfirmOrderSnapshot).toMatchSnapshot();
  });
});

describe("testing Checkout ", () => {
  it('testing checkout order confirm page', () => {
    act(() => {
      ReactDOM.render((
        <Provider store={store}>
          <Router>
            <ConfirmOrder
              requestParams={requestParams}
              postResultObj={null}
              history ={history}
              postOrder = {postOrder}
            />
          </Router>
        </Provider>
      ), container);
    });
    const spanArr = document.querySelectorAll('span');
    expect(spanArr[0].textContent.toUpperCase()).toBe('FIRST NAME');
    expect(spanArr[2].textContent.toUpperCase()).toBe('LAST NAME');
    expect(spanArr[4].textContent.toUpperCase()).toBe('ADDRESS1');
    expect(spanArr[6].textContent.toUpperCase()).toBe('ADDRESS2');
    expect(spanArr[8].textContent.toUpperCase()).toBe('COUNTRY');
    expect(spanArr[10].textContent.toUpperCase()).toBe('STATE');
    expect(spanArr[12].textContent.toUpperCase()).toBe('CITY');
    expect(spanArr[1].textContent).toBe('wint');
    expect(spanArr[3].textContent).toBe("shwe yee");
    expect(spanArr[5].textContent).toBe("ye mon taung");
    expect(spanArr[7].textContent).toBe("mandalay");
    expect(spanArr[9].textContent).toBe("myanmar");
    expect(spanArr[11].textContent).toBe("mandalay");
    expect(spanArr[13].textContent).toBe("mandalay");
    const buttonArr = document.querySelectorAll('Button');
    expect(buttonArr[0].textContent.toUpperCase()).toBe("GO PREVIOUS")
    expect(buttonArr[1].textContent.toUpperCase()).toBe("MAKE AN ORDER")
    act(() => {
      buttonArr[1].dispatchEvent(new Event('click', { bubbles: true }))
    });
    expect(postOrder).toHaveBeenCalled();
  })
  it('testing order success page', () => {
    act(() => {
      ReactDOM.render((
        <Provider store={store}>
          <Router>
            <ConfirmOrder
              requestParams={requestParams}
              postResultObj={postResultObj}
              history ={history}
              postOrder = {postOrder}
            />
          </Router>
        </Provider>
      ), container);
    });
    const spanArr = document.querySelectorAll('span');
    expect(spanArr[0].textContent).toBe("5");
    expect(spanArr[1].textContent.toUpperCase()).toBe("50000");
    
  });
})


