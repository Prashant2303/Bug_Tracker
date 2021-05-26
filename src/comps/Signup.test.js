import React from 'react'
import { mount } from 'enzyme'
import Signup from './Signup'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom'

const mockStore = configureStore([]);

describe('Signup', ()=>{
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
        wrapper = mount(<Provider store={store}> <Router> <Signup/> </Router> </Provider>)
    })

    it('renders "Create your Account" as Heading', () => {
        expect(wrapper.find('h3').text()).toEqual('Create your Account')
      });
})