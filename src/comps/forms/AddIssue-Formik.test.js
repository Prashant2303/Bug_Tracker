import React from 'react'
import { mount, shallow } from 'enzyme'
import AddIssueFormik from './AddIssue-Formik'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'

const mockStore = configureStore([]);

describe('AddIssue', ()=>{
    let wrapper;
    let store;
    beforeEach(()=>{
        store = mockStore({
            handler:{
              list: []
            },
            user:{
              list:[],
              loginStatus:true
            }
          });
        wrapper = mount(<Provider store={store}> <Router> <AddIssueFormik/> </Router> </Provider>)
    })

    // console.log(wrapper.debug())

    it('renders 8 Grids', () => {
        //   console.log(wrapper.debug())
        expect(wrapper.find(Grid).length).toEqual(8)
      });
    
    it('renders "Enter issue details" as Heading', () => {
        //   console.log(wrapper.debug())
        expect(wrapper.find('h2').text()).toEqual('Enter issue details')
      });

    test('snapshot', ()=>{
        expect(wrapper).toMatchSnapshot();
    })
})