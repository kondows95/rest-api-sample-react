import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import CartTable from '../CartTable';
import { Provider } from 'react-redux'
import store from '../../store';
import {  BrowserRouter as Router } from 'react-router-dom';
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

describe("CartTable component", () => {
  let cart = [{ id: 1, name: "a", quantity: 1, price: 1000 },
  { id: 2, name: "b", quantity: 1, price: 1000 }];
  it('matches the snapshot', () => {
    const CartTableSnapshot = renderer.create(<Provider store={store}>
      <Router>
        <CartTable cart={cart} />
      </Router>
    </Provider>).toJSON();
    expect(CartTableSnapshot).toMatchSnapshot();
  })
})

describe("testing cart table", () => {
  it('should exists one create button and one name textfield', () => {
    let cart = [
      { id: 1, name: "a", quantity: 1, price: 1000, subTotal: 1000 },
      { id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }
    ];
    const deleteCartItem = jest.fn((id) => {
      if (id === 1) cart = [{ id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }];
      else cart = [{ id: 1, name: "a", quantity: 1, price: 1000, subTotal: 1000 }];
    });
    act(() => {
      ReactDOM.render((<Provider store={store}>
        <Router>
          <CartTable cart={cart} deleteCartItem={deleteCartItem} />
        </Router>
      </Provider>), container);
    });
    const linkArr = document.querySelectorAll('a')
    expect(linkArr[0].textContent.toUpperCase()).toBe("DELETE");
    act(() => {
      linkArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const expectedCart =[{ id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }];
    expect(deleteCartItem).toHaveBeenCalled();
    expect(cart).toStrictEqual(expectedCart);
  });

})




