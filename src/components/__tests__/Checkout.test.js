import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Checkout from '../Checkout';
import { Provider } from 'react-redux'
import store from '../../store';
import { BrowserRouter as Router } from 'react-router-dom';
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
  first_name: "",
  last_name: "",
  address1: "",
  address2: "",
  country: "",
  state: "",
  city: ""
}
const setRequestParams = jest.fn((form) => {
  console.log("setRequestParams  ",form)
  let setRequest ={...form};
});
describe("CartTable component", () => {
  it('matches the snapshot', () => {
    const CheckoutSnapshot = renderer.create(<Provider store={store}>
      <Router>
        <Checkout requestParams={requestParams} />
      </Router>
    </Provider>).toJSON();
    expect(CheckoutSnapshot).toMatchSnapshot();
  })
})


describe("testing Checkout ", () => {
  it('testing textfield handelchange and click comfirm button', () => {
    act(() => {
      ReactDOM.render((<Provider store={store}>
        <Router>
          <Checkout requestParams={requestParams} setRequestParams={setRequestParams} />
        </Router>
      </Provider>), container);
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], "wint");
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[1], "shwe yee");
      inputArr[1].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[2], "ye mon taung");
      inputArr[2].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[3], "mandalay");
      inputArr[3].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[4], "myanmar");
      inputArr[4].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[5], "mandalay");
      inputArr[5].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[6], "mandalay");
      inputArr[6].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[0].value).toBe("wint");
    expect(inputArr[1].value).toBe("shwe yee");
    expect(inputArr[2].value).toBe("ye mon taung");
    expect(inputArr[3].value).toBe("mandalay");
    expect(inputArr[4].value).toBe("myanmar");
    expect(inputArr[5].value).toBe("mandalay");
    expect(inputArr[6].value).toBe("mandalay");
    const buttonArray = document.querySelectorAll('button');
    expect(buttonArray[2].textContent.toUpperCase()).toBe("PROCEED TO COMFIRM")
    act(() => {
      buttonArray[2].dispatchEvent(new Event('click', { bubbles: true }))
    });
    expect(setRequestParams).toHaveBeenCalled();
  });
 
})

