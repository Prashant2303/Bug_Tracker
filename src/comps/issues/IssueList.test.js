import React from 'react'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import IssuesList from './IssuesList'
import { Provider } from 'react-redux';
import { CardContent, FormControlLabel } from '@material-ui/core'
import Issue from './Issue'
import { Grid, Card } from '@material-ui/core'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store';
//https://stackoverflow.com/questions/61717143/how-do-you-debug-a-shallow-rendered-enzyme-test
//https://www.robinwieruch.de/react-connected-component-test
//https://stackoverflow.com/questions/44034904/jest-enzyme-shallow-test-is-not-rendering-all-elements-of-the-react-component
const mockStore = configureStore([]);

describe('When Issues array passed has 2 issues', () => {

  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({
      handler:{
        list: [
          {
            "id": 1,
            "desc": "On Clicking Delete, the application crashes",
            "severity": "Critical",
            "status": "Open",
            "cdate": "12/02/2021",
            "rdate": "",
            "viewed": 21
          },
          {
            "id": 2,
            "desc": "The heading Add is wrongly displayed as Edit",
            "severity": "Minor",
            "cdate": "12/02/2021",
            "rdate": "03/12/2021",
            "status": "Closed",
            "viewed": 8
          }
        ]
      },
      user:{
        list:[],
        loginStatus:true
      }
    });
    
    wrapper = mount(<Provider store={store}> <Router> <IssuesList /> </Router> </Provider>);
  });
  
  it('renders 10 grids', () => {
    expect(wrapper.find(Grid).length).toEqual(10)
  })

  

  it('renders two issues', () => {
    expect(wrapper.find(Issue).length).toEqual(2)
  })

  test('snapshot with 2 issues', () => {
    expect(wrapper).toMatchSnapshot();
  })
})

describe('When Issues array passed is null',() => {
  let wrapper;
  let store;
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
    
    wrapper = mount(<Provider store={store}> <Router> <IssuesList /> </Router> </Provider>);
  });
  
  it('renders 5 Filter Options', () => {
    expect(wrapper.find(FormControlLabel).length).toEqual(5)
  });

  it('renders no issues without crashing', () => {
    expect(wrapper.find(Issue).length).toEqual(0)
  })

  test('snapshot with 0 issues', () => {
    expect(wrapper).toMatchSnapshot();
  })
})