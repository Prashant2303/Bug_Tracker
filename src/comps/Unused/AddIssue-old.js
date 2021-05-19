import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import base_url from '../service/api';
import {useDispatch, useSelector} from 'react-redux';
import { add } from '../redux/issueSlice';
import TextWrapper from './TextWrapper';

const AddIssueFormik = () => {

    const dispatch = useDispatch();
    const listInStore = useSelector(state=>state.handler.list);
    console.log('ListInStore '+JSON.stringify(listInStore));

    return(
        <Formik
            initialValues={{
                desc:'',
                severity:'',
                status:''
            }} 
            validationSchema={Yup.object({
                desc: Yup.string().min(3,'Must be 3 chars').required('Issue Description is required'),
                severity: Yup.string().required('Select Severity'),
                status: Yup.string().required()
            })}
            onSubmit={(values)=>{
                console.log('On Submit '+JSON.stringify(listInStore));
                let lastId = listInStore[listInStore.length-1].id;
                console.log(lastId)
                values.id = lastId+1;
                // console.log(JSON.stringify(values));
                axios.post(`${base_url}/issues`,values).then(
                    (response) => {
                        alert('Issue Added')
                        // console.log('Before Add '+ JSON.stringify(listInStore));
                        dispatch( add(values) );
                        // console.log('After Add '+ JSON.stringify(listInStore));
                    },
                    (error) => {
                        alert('Issue could not be added')
                    }
                )
            }}
            >
            
            <Form>
            <h1>Add Issue</h1>
                <label>Description:
                    <Field type="text" name="desc" placeholder="Enter Issue Description" style={{marginLeft:10, width:350}} />
                    <ErrorMessage name="desc">
                        { msg => <span style={{ color: 'red' }}>{msg}</span> }
                    </ErrorMessage>
                </label><br/>
                <label>Severity:
                    <Field name="severity" as='select' style={{marginLeft:35}}>
                        <option value=''>Select</option>
                        <option value='Minor'>Minor</option>
                        <option value='Major'>Major</option>
                        <option value='Critical'>Critical</option>
                    </Field>
                </label><br/>
                <label>
                    Status:
                    <Field type="radio" name="status" value="Open" style={{marginLeft:46.5}}/>Open
                    <Field type="radio" name="status" value="In Progress" />In Progress
                    <Field type="radio" name="status" value="Closed" />Closed
                </label><br/>
                <button type="submit" style={{marginTop:20}}> Submit </button>
            </Form>
        </Formik>
    )
}

export default AddIssueFormik;

// OLD FORM
// const AddIssueFormik = () => (
//   <div>
//     <h1>Any place in your app!</h1>
//     <Formik
//       initialValues={{ email: '', password: '' }}
//       validate={values => {
//         const errors = {};
//         if (!values.email) {
//           errors.email = 'Required';
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = 'Invalid email address';
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <Label>Email:
//             <Field type="email" name="email" />
//             <ErrorMessage name="email" component="div" />
//           </Label>
//           <Label>Password:
//             <Field type="password" name="password" />
//             <ErrorMessage name="password" component="div" />
//           </Label>
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );