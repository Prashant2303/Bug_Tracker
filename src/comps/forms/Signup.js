import React, { useState } from 'react';
import { Avatar, CssBaseline, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { signupThunk } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextWrapper from './TextWrapper';
import ButtonWrapper from './ButtonWrapper';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paperSignup: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
}));

export default function SignUp() {
    const classes = useStyles();

    const succ = () => toast.success('Signed Up Successfully');
    const fail = (message = 'Something went wrong') => toast.error(message);

    const history = useHistory();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    
    const handleSubmit = async (values) => {
        setSubmitting(true);
        try {
            unwrapResult(await dispatch(signupThunk(values)));
            history.push("/");
            succ();
        }
        catch (error) {
            fail(error?.response?.data?.message);
        }
        finally {
            setSubmitting(false);
        }
    }

    const renderSignup = (
        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object({
                firstname: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
                lastname: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().min(8,'Must be 8 characters at least').required('Required'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'),null], 'Passwords must match').required('Required')
            })}
            onSubmit={ values => handleSubmit(values) }
        >
        <Form>
            <Grid container spacing={2}>
                <TextWrapper sm={6} name='firstname' label='First Name' />
                <TextWrapper sm={6} name='lastname' label='Last Name' />
                <TextWrapper name='email' label='Email' />
                <TextWrapper name='password' label='Password' type="password" showVisibility />
                <TextWrapper name="confirmPassword" label="Confirm Password" type="password" />
                <ButtonWrapper className={classes.submit} disabled={submitting}>
                    {submitting ? 'Signing Up':'Sign Up'}
                </ButtonWrapper>
            </Grid>
        </Form>
        </Formik>
    )

    return (
        <Container style={{'marginBottom':'20vh'}} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paperSignup}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{marginBottom:'10px'}}>
                    Sign Up
                </Typography>
                <form className={classes.form}>
                    { renderSignup }
                    <Grid container justify='flex-end'>
                        <NavLink className={classes.link} exact to="/signin">Already have an account? Sign in</NavLink>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}