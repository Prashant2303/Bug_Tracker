import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import Icon from './Icon';
import { localSignin, signinThunk } from '../../redux/userSlice';
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
    paperSignin: {
        marginTop: theme.spacing(8),
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
    googleButton: {
        marginBottom: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    footer: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    }
}));

export default function SignIn() {
    const classes = useStyles();

    const succ = () => toast.success('Logged In Successfully');
    const fail = (message = 'Something went wrong') => toast.error(message);

    const history = useHistory();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    
    const handleSubmit = async (values) => {
        setSubmitting(true);
        try {
            unwrapResult(await dispatch(signinThunk(values)));
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

    const googleSuccess = async (res) => {
        const profile = res?.profileObj;
        const authObj = {
            result: {
                name: profile.name,
                email: profile.email,
                _id: profile.googleId
            },
            token: res?.tokenId
        }
        dispatch(localSignin(authObj));
        history.push("/");
        succ();
    }

    const googleFailure = (err) => {
        console.log('Google login failed ', err);
        fail();
    }

    const renderSignin = (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().min(8,'Must be 8 characters at least').required('Required')
            })}
            onSubmit={ values => handleSubmit(values) }
        >
        <Form>
            <Grid container spacing={2}>
                <TextWrapper name='email' label='Email' />
                <TextWrapper name='password' label='Password' type="password" showVisibility />
                <ButtonWrapper className={classes.submit} disabled={submitting}>
                    {submitting ? 'Signing In':'Sign In'}
                </ButtonWrapper>
            </Grid>
        </Form>
        </Formik>
    )

    return (
        <Container style={{'marginBottom':'20vh'}} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={ classes.paperSignin }>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{marginBottom:'10px'}}>
                    Sign In
                </Typography>
                <form className={classes.form}>
                    { renderSignin }
                    <GoogleLogin
                        clientId="621494010348-ljq9ja1nrrtc976603672tli08fkssno.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button className={classes.googleButton} fullWidth variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>Sign in using Google</Button>
                        )}
                        buttonText="Login"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justify='flex-end'>
                        <NavLink className={classes.link} exact to="/signup">Don't have an account? Sign Up</NavLink>
                    </Grid>
                </form>
                <div className={classes.footer}>* If you are unable to sign in using Google, clear browser cache.</div>
            </div>
        </Container>
    );
}