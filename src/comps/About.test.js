import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import About from './About'
import { Grid } from '@material-ui/core'

describe('About', () => {
  it('renders without crashing given the required props', () => {
    // const props = {
    //   isFetching: false,
    //   dispatch: jest.fn(),
    //   selectedSubreddit: 'reactjs',
    //   posts: []
    // }
    const wrapper = shallow(<About />)
    expect(wrapper.find(Grid).length).toEqual(3)
  })
})