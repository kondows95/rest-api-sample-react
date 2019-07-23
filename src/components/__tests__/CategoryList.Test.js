import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import CategoryList from '../CategoryList';

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
describe("testing creating category", () => {
  const initialCategory = { id: null, name: "" };
  const categories = [{ id: 1, name: "a" }, { id: 2, name: "b" }];
  

  it('should exists one create button and one name textfield', () => {
    act(() => {
      ReactDOM.render(<CategoryList categories={categories} />, container);
    });
    const button = container.querySelectorAll('Button')
    expect(button[0].id).toBe("create")
    act(() => {
      button[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const inputArr = document.querySelectorAll('input');
    expect(inputArr).toHaveLength(1);
    expect(inputArr[0].id).toBe("name");
  });

  it('check the textfield handle change and click cancle button', () => {
    act(() => {
      ReactDOM.render(<CategoryList categories={categories} />, container);
    });
    const CreateButton = container.querySelectorAll('Button')
    act(() => {
      CreateButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], 123);
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[0].value).toBe("123");
    const buttonArray = container.querySelectorAll('button');
    act(() => {
      buttonArray[0].dispatchEvent(new Event('click', { bubbles: true }))
    })
    expect(inputArr[0].value).toBe("");
  });
  it('click submit button', () => {
    const saveCategory = jest.fn((setSelectedCategory) => {
      console.log("enter");
      categories =[...categories,...setSelectedCategory]
      console.log("categories are ",categories)
    });
    act(() => {
      ReactDOM.render(<CategoryList categories={categories} saveCategory={saveCategory} />, container);
    });
    const CreateButton = container.querySelectorAll('Button')
    act(() => {
      CreateButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], 'abc');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    const buttonArray = container.querySelectorAll('button');
    
    //expect(buttonArray[1].id).toBe("submit")
    // act(() => {
    //   buttonArray[1].dispatchEvent(new Event('click', { bubbles: true }))
    // })
    // expect(saveCategory).toHaveBeenCalled()
  });
})