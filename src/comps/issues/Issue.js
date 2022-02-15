import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, IconButton, CardActions, CardHeader } from '@material-ui/core';
import { delIssueThunk, updateViewCountThunk } from '../../redux/issueSlice';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteForeverRounded, EditRounded, LaunchRounded } from '@material-ui/icons';
import toast from 'react-hot-toast';
import Loading from '../Loading';
import { unwrapResult } from '@reduxjs/toolkit'

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        textAlign: 'left'
    },
    span: {
        color: 'darkslategrey'
    }
});


const Issue = ({ issue, displayProps }) => {

    const succ = () => toast.success('Issue deleted');
    const fail = () => toast.error('Issue could not be deleted');
    const loginRequiredToast = () => toast('Login Required');

    const isLoggedIn = useSelector(state => state.user.loginStatus);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const delIssue = async (id) => {
        setLoading(true);
        try {
            unwrapResult(await dispatch(delIssueThunk(id)))
            // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
            succ();
        }
        catch (err) {
            console.log('Delete Error ',err);
            fail()
        }
        finally {
            setLoading(false)
        }
    }

    const updateViewCount = async (issue) => {
        try {
            await dispatch(updateViewCountThunk(issue));
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleDetails = (e) => {
        if (isLoggedIn === false) {
            e.preventDefault();
            loginRequiredToast();
        }
        else
            updateViewCount(issue);
    }

    const handleEdit = (e) => {
        if (isLoggedIn === false) {
            e.preventDefault();
            loginRequiredToast();
        }
    }

    const handleDelete = (e) => {
        if (isLoggedIn === false) {
            e.preventDefault();
            loginRequiredToast();
        }
        else
            delIssue(issue.id)
    }

    const renderCard = (
        <Card className={classes.root} variant='elevation' elevation={5}>
            <CardHeader
                title={`Id - ${issue.id}`}
                action={
                    <CardActions>

                        <IconButton aria-label="Edit">
                            <Link to={{ pathname: '/editIssue', state: issue }} onClick={handleEdit}>
                                <EditRounded color={isLoggedIn ? 'primary' : 'disabled'} />
                            </Link>
                        </IconButton>

                        <IconButton aria-label="Delete" onClick={handleDelete}>
                            <DeleteForeverRounded color={isLoggedIn ? 'error' : 'disabled'} />
                        </IconButton>

                        <IconButton aria-label="Details">
                            <Link to={{ pathname: '/issueDetails', state: issue }} onClick={handleDetails}>
                                <LaunchRounded color={isLoggedIn ? 'primary' : 'disabled'} />
                            </Link>
                        </IconButton>

                    </CardActions>
                }
            />

            <CardContent align='center'>

                {
                    displayProps.descSwitch === true ?
                        <Typography variant="h6" className={classes.pos} component="p">
                            <span className={classes.span}>Description - </span>{issue.desc}
                        </Typography> : null
                }
                {
                    displayProps.severitySwitch === true ?
                        <Typography variant='h6' color="textPrimary">
                            <span className={classes.span}>Severity - </span>{issue.severity}
                        </Typography> : null
                }
                {
                    displayProps.statusSwitch === true ?
                        <Typography variant='h6' color="textPrimary">
                            <span className={classes.span}>Status - </span>{issue.status}
                        </Typography> : null
                }
                {
                    displayProps.cdateSwitch === true ?
                        <Typography variant='h6' color="textPrimary">
                            <span className={classes.span}>Created On - </span>{issue.cdate}
                        </Typography> : null
                }
                {
                    displayProps.rdateSwitch === true && issue.status === 'Closed' ?
                        <Typography variant='h6' color="textPrimary">
                            <span className={classes.span}>Closed On - </span>{issue.rdate}
                        </Typography> : null
                }
            </CardContent>
        </Card>
    )

    return (
        <Grid item xs={12} sm={8} md={5}>
            {loading ? <Loading /> : renderCard}
        </Grid>
    );
}

export default Issue;