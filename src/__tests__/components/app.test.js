import React from 'react';
import App from '../../components/app.js';

import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe('<App/> (Enzyme Test)', () => {

  it('is alive at application start', () => {
    let app = shallow(<App />);
    expect(app.find('input').exists()).toBeTruthy();
  });

});
