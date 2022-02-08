import React,{ useState } from 'react'
import useStyles from './FormStyle';
import { Grid, Paper, Container } from '@material-ui/core';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextWrapper from './TextWrapper';
import ButtonWrapper from './ButtonWrapper';
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/userSlice';
import { useHistory } from 'react-router-dom';
// import base_url from '../service/api';
import toast from 'react-hot-toast';

const Login = () => {

    const succ = () => toast.success('Logged In Successfully');
    const fail = () => toast.error('Something Went Wrong');

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const userList = useSelector(state=>state.user.list);
    console.log('USERLIST ',userList);

    const [submitting, setSubmitting] = useState(false)

    return (
        <Paper className={classes.paper} xs={12} elevation={5}>

            <h3 className={classes.heading}>Log in to your account</h3>
            <Grid item xs={12}>
                <Container className={classes.container}>
                    <Formik
                        initialValues={{
                            email:'',
                            password:''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: Yup.string().required('Required')
                        })}
                        onSubmit={ values => {
                            // alert(JSON.stringify(userList)+' '+JSON.stringify(values))
                            setSubmitting(true)
                            let result = false;
                            for(let i=0;i<userList.length;i++)
                            {
                                if(userList[i].email===values.email && userList[i].pass===values.password)
                                {
                                    // alert('Success'+JSON.stringify(userList[i]));
                                    result = true;
                                    break;
                                }
                            }
                            if(result===true)
                            {
                                localStorage.setItem('user',true);
                                dispatch(login(result));
                                setSubmitting(false)
                                history.push("/");
                                succ();
                            }
                            else
                            {
                                setSubmitting(false)
                                // alert('Invalid Username or Password');
                                fail();
                            }
                        }}
                    >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextWrapper name='email' label='Email' />
                            </Grid>

                            <Grid item xs={12}>
                                <TextWrapper name='password' label='Password' type='password' />
                            </Grid>

                            <Grid item xs={12}>
                                <ButtonWrapper>
                                    {submitting===true?'Logging In':'Log In'}
                                </ButtonWrapper>
                            </Grid>
                        </Grid>
                    </Form>

                    </Formik>
                </Container>
            </Grid>
        </Paper>
    )
}

export default Login;
