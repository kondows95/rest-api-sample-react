import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store from '../../store';
import QuantitySelect from '../QuantitySelect';
let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null
})
const changeQuantity = jest.fn((id, quantity) => {
  let quantity1 = quantity;
});
const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
describe("QuantitySelect component", () => {
  it('matches the snapshot', () => {
    const QuantitySelectSnapshot = renderer.create(
      <QuantitySelect
        id={1}
        quantity={2}
        maxQuantity={4}
        changeQuantity={changeQuantity} />
    ).toJSON();
    expect(QuantitySelectSnapshot).toMatchSnapshot();
  });
});

describe("testing Quantity Select", () => {
  it('testing changing quantity', () => {
    const options =[1,2,3,4];
    act(() => {
      ReactDOM.render((
        <QuantitySelect
        id={1}
        quantity={3}
        maxQuantity={4}
        changeQuantity={changeQuantity} />
      ), container);
    });
    const selectArr = document.querySelectorAll('select');
    act(() =>{
      selectArr[0].value = "6";
     selectArr[0].dispatchEvent(new Event('change', {bubbles: true}))
    })
    expect(changeQuantity).toHaveBeenCalledWith(1,"6");
  });
 
})