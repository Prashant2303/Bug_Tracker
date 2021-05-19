import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import IssuesList from './IssuesList'
import { Provider } from 'react-redux';
import store from '../redux/store'
import { CardContent, FormControlLabel } from '@material-ui/core'
import Issue from './Issue'
import { Grid } from '@material-ui/core'
//https://stackoverflow.com/questions/61321283/react-test-separate-parent-component-without-redux
// let store = {
//         handler:{
//             list:[]
//         },
//         user:{
//             list:[],
//             loginStatus:true
//         }
//     }

describe('IssueList', () => {
  it('renders without crashing given the required props', () => {
    const props = {
       data: [
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
            ],
        storedata: [
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
            ] }
    const wrapper = shallow(<Provider store={store}> <IssuesList {...props} /> </Provider>)
    console.log(wrapper.debug())
    expect(wrapper.find(Grid).length).toEqual(0)
  })
})

// describe('When List is passed to IssueList Component',()=>{
//     let wrapper;
//     let props;

//     beforeEach(() => {
//         props = { }
//         wrapper = shallow(<IssuesList {...props}/>);
//     });

//     it('should exists', function () {
//         assert.isDefined(IssuesList)
//     })

//     it('renders 5 Filter Options', () => {
//         expect(wrapper.find(FormControlLabel).length.toEqual(5))
//     });

//     // it('renders “Status” as fourth column heading', () => {
//     //     expect(wrapper.find(CardContent).childAt(3).text()).toEqual("Status")
//     // });
// })