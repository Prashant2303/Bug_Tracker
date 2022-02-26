import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import { login } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

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
}));

export default function SignIn() {
    const classes = useStyles();

    const succ = () => toast.success('Logged In Successfully');
    const fail = () => toast.error('Something Went Wrong');

    const history = useHistory();
    const dispatch = useDispatch();

    // const [submitting, setSubmitting] = useState(false)
    const [signup, setSignup] = useState(false);
    const switchmode = () => {
        setSignup((prevSignup) => !prevSignup);
    }
    const handleSubmit = () => {
        // alert('Hi');
    }
    // const handleChange = () => {
    //     // alert('Hi');
    // }
    const googleSuccess = async(res) => {
        const profile = res?.profileObj;
        const token = res?.tokenId;
        dispatch(login(true));
        history.push("/");
        succ();
    }
    const googleFailure = (err) => {
        console.log('Google login failed ',err);
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
                                        <TextField autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname"
                                        />
                                    </Grid>
                                </Grid>
                            </> : null
                    }
                    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus
                    />
                    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"
                    />
                    {
                        signup ?
                            <TextField variant="outlined" margin="normal" required fullWidth name="confirmpassword" label="Confirm Password" type="password" id="confirmpassword" autoComplete="current-password"
                            /> : null
                    }
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {signup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="621494010348-ljq9ja1nrrtc976603672tli08fkssno.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button className={classes.submit} fullWidth variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in using Google</Button>
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