import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Provider } from 'react-redux';
import { Typography } from '@material-ui/core'
import Issue from './Issue'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('When all filters are true',() => {
  let wrapper;
  let store;
  let props;
  beforeEach(() => {
    store = mockStore({
      handler:{
        list: []
      },
      user:{
        list:[],
        loginStatus:true
      }
    });
    props = {
        issue : {
            "desc": "On adding to cart, the item does not get added",
            "severity": "Minor",
            "status": "Open",
            "cdate": "12/02/2021",
            "rdate": "",
            "id": 4,
            "viewed": 33
          },
        displayProps : {
            severitySwitch: true,
            statusSwitch: true,
            descSwitch: true,
            cdateSwitch: true,
            rdateSwitch: true,
        }
    }
    wrapper = mount(<Provider store={store}> <Router> <Issue {...props}/> </Router> </Provider>);
  });
  
  it('renders 5 properties of an Issue', () => {
    expect(wrapper.find(Typography).length).toEqual(5)
  });
  
  test('snapshot of Issue', () => {
    expect(wrapper).toMatchSnapshot();
  })
})

describe('When all filters are false',() => {
  let wrapper;
  let store;
  let props;
  beforeEach(() => {
    store = mockStore({
      handler:{
        list: []
      },
      user:{
        list:[],
        loginStatus:true
      }
    });
    props = {
        issue : {
            "desc": "On adding to cart, the item does not get added",
            "severity": "Minor",
            "status": "Open",
            "cdate": "12/02/2021",
            "rdate": "",
            "id": 4,
            "viewed": 33
          },
        displayProps : {
            severitySwitch: false,
            statusSwitch: false,
            descSwitch: false,
            cdateSwitch: false,
            rdateSwitch: false,
        }
    }
    wrapper = mount(<Provider store={store}> <Router> <Issue {...props}/> </Router> </Provider>);
  });
  
  it('renders 0 properties of an Issue', () => {
    //   console.log(wrapper.debug())
    expect(wrapper.find(Typography).length).toEqual(1)
  });
  
  test('snapshot of Issue', () => {
    expect(wrapper).toMatchSnapshot();
  })
})