import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import Icon from './Icon';
import { login, signupThunk, signinThunk } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

const useStyles = makeStyles((theme) => ({
    paper: {
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
        margin: theme.spacing(3, 0, 2),
    },
    googleButton: {
        marginBottom: theme.spacing(2),
    },
}));

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignIn() {
    const classes = useStyles();

    const succ = () => toast.success('Logged In Successfully');
    const fail = () => toast.error('Something Went Wrong');

    const history = useHistory();
    const dispatch = useDispatch();

    const [signup, setSignup] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const switchmode = () => {
        setSignup((prevSignup) => !prevSignup);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            unwrapResult(await dispatch(signup ? signupThunk(formData) : signinThunk(formData)));
            history.push("/");
            succ();
        }
        catch (error) {
            console.log('AUTHENTICATION FAILED ', error);
            fail();
        }
        finally {
            setSubmitting(false);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const googleSuccess = async (res) => {
        const profile = res?.profileObj;
        const token = res?.tokenId;
        const authObj = {
            profile,
            token
        }
        console.log('authObj ', authObj);
        dispatch(login(authObj));
        history.push("/");
        succ();
    }

    const googleFailure = (err) => {
        console.log('Google login failed ', err);
        fail();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {signup ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    {
                        signup ?
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant="outlined" required fullWidth id="firstName" label="First Name" name="firstName"
                                            autoComplete="firstname" autoFocus onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName"
                                            autoComplete="lastname" onChange={handleChange} />
                                    </Grid>
                                </Grid>
                            </> : null
                    }
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleChange} />
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type={showPassword ? "text" : "password"} id="password" autoComplete="current-password" onChange={handleChange}
                        InputProps={
                            {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }
                    />
                    {
                        signup ?
                            <TextField variant="outlined" margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" autoComplete="current-password" onChange={handleChange}
                            /> : null
                    }
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={submitting}>
                        {signup ? submitting ? 'Signing Up' : 'Sign Up' : submitting ? 'Signing In' : 'Sign In'}
                    </Button>
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
                        <Link href="#" variant="body2" onClick={switchmode}>
                            {signup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}