import React,{ useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextWrapper from './TextWrapper';
import { Grid, Paper, Container } from '@material-ui/core';
import ButtonWrapper from './ButtonWrapper';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { add, login } from '../redux/userSlice';
import base_url from '../service/api';
import useStyles from './FormStyle';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    
    const succ = () => toast.success('Signed Up Successfully');
    const fail = () => toast.error('Something Went Wrong');

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const userList = useSelector(state=>state.user.list);
    console.log(userList);

    const [submitting, setSubmitting] = useState(false)

    return (
        <Paper className={classes.paper} xs={12} elevation={5}>
                
            <h3 className={classes.heading}>Create your Account</h3>
            
            <Grid item xs={12}>
                <Container className={classes.container}>
                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            email: '',
                            phone: '',
                            pass: '',
                            location: ''
                        }}
                        validationSchema={Yup.object({
                            fname: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                            lname: Yup.string().max(15, 'Must be 20 characters or less').required('Required'),
                            email: Yup.string().email('Invalid email address').required('Required'),
                            phone: Yup.string().matches(/^[6-9]\d{9}$/,'Invalid Phone Number'),
                            pass: Yup.string().min(8,'Must be 8 characters at least').required('Required'),
                            location: Yup.string()
                        })}
                        onSubmit={(values) => {
                            // alert(JSON.stringify(values))
                            // console.log(values)
                            setSubmitting(true)
                            let alreadyExist = false;
                            for(let i=0;i<userList.length;i++)
                            {
                                if(userList[i].email===values.email)
                                {
                                    alert(userList[i].email+' '+values.email);
                                    alreadyExist = true;
                                    break;
                                }
                            }
                            if(alreadyExist===true)
                            {
                                alert('User already Exists')
                            }
                            else
                            {
                                values.id = userList==null?0:userList[userList.length-1].id + 1;
                                axios.post(`${base_url}/users`,values).then(
                                    (response) => {
                                        console.log('Before Add '+ JSON.stringify(userList));
                                        dispatch(add(values));

                                        localStorage.setItem('user',true);
                                        dispatch(login(alreadyExist));

                                        setSubmitting(false)
                                        // alert('User Added Succesfully')
                                        history.push("/");
                                        succ();
                                        // console.log('After Add '+ JSON.stringify(userInStore));
                                    },
                                    (error) => {
                                        setSubmitting(false)
                                        // alert('User could not be added')
                                        fail()
                                    }
                                )
                            }
                        }}
                    >
                    <Form>
                        <Grid container spacing={2}>
                            
                            <Grid item sm={6} xs={12}>
                                <TextWrapper name='fname' label='First Name' />
                            </Grid>

                            <Grid item sm={6} xs={12}>
                                <TextWrapper name='lname' label='Last Name' />
                            </Grid>

                            <Grid item xs={12}>
                                <TextWrapper name='email' label='Email' />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextWrapper name='phone' label='Phone' />
                            </Grid>

                            <Grid item xs={12}>
                                <TextWrapper name='location' label='Location' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextWrapper name='pass' label='Password' type="password"/>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonWrapper disabled={submitting}>
                                    {submitting==true?'Signing Up':'Sign Up'}
                                </ButtonWrapper>
                            </Grid>
                            {/* <Button variant='contained' color='primary' type='submit' fullWidth=true >Sign Up</Button> */}
                        </Grid>
                    </Form>
                    </Formik>

                </Container>
            </Grid>
            <h5 className={classes.heading}>Avoid giving personal information</h5>
        </Paper>

    )
}

export default Signup;