
import React from 'react';
import { shallow,configure,mount} from 'enzyme';

import Test from '../Test';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('MyComponent ', () => {
  it('renders three <Test /> components', () => {
    const wrapper = mount(<Test />);
    expect(wrapper.find('h1')). toBeTruthy();
    //expect(1).toEqual(1)
  });
});