import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, IconButton, CardActions, CardHeader} from '@material-ui/core';
import { del } from '../redux/issueSlice';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import base_url from '../service/api';
import { DeleteForeverRounded, EditRounded, LaunchRounded } from '@material-ui/icons';

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
    
    const isLoggedIn = useSelector(state=>state.user.loginStatus);
    const classes = useStyles();
    const dispatch = useDispatch();

    const delIssue = (id) => {
        axios.delete(`${base_url}/issues/${id}`).then(
            (response)=>{
                alert('Issue deleted')
            },
            (error) => {
                alert('Something went wrong')
            }
        )
        dispatch(del(id));
    }

    const handleDetails = (e) => {
        if(isLoggedIn===false)
        {
            e.preventDefault();
            alert('Login Required')
        }
        else
        {
            // console.log(JSON.stringify(issue))
            let newIssue = {...issue};
            newIssue.viewed = issue.viewed+1;
            // console.log(JSON.stringify(newIssue))
            axios.put(`${base_url}/issues/${issue.id}`, newIssue).then(
                (response) => {
                    console.log('Issue Count Updated')
                },
                (error) => {
                    alert('Issue count not Updated')
                }
            )
        }
    }
    const handleEdit = (e) => {
        if(isLoggedIn===false)
        {
            e.preventDefault();
            alert('Login Required')
        }
    }
    const handleDelete = (e) => {
        if(isLoggedIn===false)
        {
            e.preventDefault();
            alert('Login Required')
        }
        else
        {
            delIssue(issue.id)
        }
    }
    return (
        <Grid item xs={12} sm={8} md={5}>
        
        <Card className={classes.root} variant='elevation' elevation={5}>
            <CardHeader 
                title={`Id - ${issue.id}`}
                action={
                    <CardActions>

                        <IconButton aria-label="Edit">
                            <Link to={{ pathname: '/editIssue', state: issue }} onClick={handleEdit}>
                                <EditRounded color={isLoggedIn?'primary':'disabled'}/>
                            </Link>
                        </IconButton>

                        <IconButton aria-label="Delete" onClick={handleDelete}>
                            <DeleteForeverRounded color={isLoggedIn?'error':'disabled'} />
                        </IconButton>
                        
                        <IconButton aria-label="Details">
                            <Link to={{ pathname: '/issueDetails', state: issue }} onClick={handleDetails}>
                                <LaunchRounded color={isLoggedIn?'primary':'disabled'} />
                            </Link>
                        </IconButton>

                    </CardActions>
                }
            />
                
            <CardContent align='center'>
                
                {
                    displayProps.descSwitch===true?
                    <Typography variant="h6" className={classes.pos} component="p">
                        <span className={classes.span}>Description - </span>{issue.desc}
                    </Typography>:null
                }
                {
                    // console.log(displayProps)
                    displayProps.severitySwitch===true?
                    <Typography variant='h6' color="textPrimary">
                        <span className={classes.span}>Severity - </span>{issue.severity}
                    </Typography>:null
                }
                {
                    displayProps.statusSwitch===true?
                    <Typography variant='h6' color="textPrimary">
                        <span className={classes.span}>Status - </span>{issue.status}
                    </Typography>:null
                }
                {
                    displayProps.cdateSwitch===true?
                    <Typography variant='h6' color="textPrimary">
                        <span className={classes.span}>Created On - </span>{issue.cdate}
                    </Typography>:null
                }
                {
                    displayProps.rdateSwitch===true && issue.status==='Closed'?
                    <Typography variant='h6' color="textPrimary">
                        <span className={classes.span}>Closed On - </span>{issue.rdate}
                    </Typography>:null
                }
            </CardContent>
        </Card>
        </Grid>
    );
}

export default Issue;