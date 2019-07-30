import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import CategoryList from '../CategoryList';
import renderer from 'react-test-renderer';
import CheckoutOrderReviewCart from '../CheckoutOrderReviewCart';
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

describe("CheckoutOrderReviewCart component", () => {
  let cart = [{ id: 1, name: "a", quantity: 1, price: 1000, image:"a.jpg",subTotal : 1000 },
  { id: 2, name: "b", quantity: 1, price: 1000 , image:"a.jpg",subTotal : 1000 }];

  it('matches the snapshot', () => {
    const OrderReviewCartSnapshot = renderer.create(<CheckoutOrderReviewCart
      cart={cart}
      totalPrice={2000}
    />).toJSON();
    expect(OrderReviewCartSnapshot).toMatchSnapshot();
  });
});

