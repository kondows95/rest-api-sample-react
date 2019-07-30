import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import FormTitle from '../auth/FormTitle';

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null
})

describe("FormTitle component snapshot", () => {
  it('matches the snapshot', () => {
    const FormTitleSnapshot = renderer.create(
      <FormTitle
        children={"Please enter your email"}
      />
    ).toJSON();
    expect(FormTitleSnapshot).toMatchSnapshot();
  })
})
