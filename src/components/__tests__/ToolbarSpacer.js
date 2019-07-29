import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import store from '../../store';
import ToolbarSpacer from '../ToolbarSpacer';
let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null
})

describe("Confirm Toolbar component", () => {
  it('matches the snapshot', () => {
    const ToolbarSnapshot = renderer.create(
      <Provider store={store}>
        <Router>
          <ToolbarSpacer/>
        </Router>
      </Provider>
    ).toJSON();
    expect(ToolbarSnapshot).toMatchSnapshot();
  });
});