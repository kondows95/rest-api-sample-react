import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import CartTotal from '../CartTotal';
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
const totalPrice = 2000;
const totalQuantity = 2;
describe("CartTotal component snapshot", () => {

  it('matches the snapshot', () => {
    const CartTotalSnapshot = renderer.create(
      <Router>
        <CartTotal totalPrice={totalPrice} totalQuantity={totalQuantity} />
      </Router>
    ).toJSON();
    expect(CartTotalSnapshot).toMatchSnapshot();
  })
})

describe("testing cart table", () => {
  it('Component render comfirm order link to /checkout and continue shopping link to /', () => {
    act(() => {
      ReactDOM.render((
        <Router>
          <CartTotal totalPrice={totalPrice} totalQuantity={totalQuantity} />
        </Router>
      ), container);
    });
    const linkArr = document.querySelectorAll('a');
    expect(linkArr[0].textContent.toUpperCase()).toBe("CONFIRM ORDER")
    expect(linkArr[0].getAttribute("href")).toBe("/checkout")
    expect(linkArr[1].textContent.toUpperCase()).toBe("CONTINUE SHOPPING")
    expect(linkArr[1].getAttribute("href")).toBe("/")
  });
  it(' comfirm order link to # because totalquantity <= 0', () => {
    act(() => {
      ReactDOM.render((
        <Router>
          <CartTotal totalPrice={0} totalQuantity={0} />
        </Router>
      ), container);
    });
    const linkArr = document.querySelectorAll('a');
    expect(linkArr[0].textContent.toUpperCase()).toBe("CONFIRM ORDER")
    expect(linkArr[0].getAttribute("href")).toBe("/")
  });
})

