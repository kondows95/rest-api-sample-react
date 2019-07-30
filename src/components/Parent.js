import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from "react-intl";
import { chooseLocale } from '../locations';
import store from '../store';

const Parent = ({children}) => {
  return (
    <Provider store={store}>
      <IntlProvider locale={'en'} messages={chooseLocale('en')}>
        <Router>
          {children}
        </Router>
      </IntlProvider>
    </Provider>
  );
}
export default Parent


