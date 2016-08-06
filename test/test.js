import React from 'react';
import Login from '../views/Login' ;
import {mount} from 'enzyme';

describe('test', () => {
  it('b', () => {
    let login = mount(<Login/>);
    expect(login.find('.form-control').length).to.equal(2);
  })
})
