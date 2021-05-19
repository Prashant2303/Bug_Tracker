import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Paper, Grid } from '@material-ui/core';
import base_url from '../service/api';
import IssuesList from './IssuesList';
import { useDispatch, useSelector } from 'react-redux';
import { load } from '../redux/issueSlice';
import { NavLink } from 'react-router-dom'
import { loadUsers, login } from '../redux/userSlice';

const AllIssues = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getIssuesFromServer();
        getUsersFromServer();
        getUserFromSession();
    }, [])

    const getIssuesFromServer = () => {
        axios.get(`${base_url}/issues`).then(
            (response) => {
                // console.log('Response from server '+ JSON.stringify(response.data));
                // setIssues(response.data);
                dispatch(load(response.data));
            },
            (error) => {
                console.log(error);
            }
        )
    }
    const getUsersFromServer = () => {
        axios.get(`${base_url}/users`).then(
            (response) => {
                console.log('Users from server '+ JSON.stringify(response.data));
                // setIssues(response.data);
                dispatch(loadUsers(response.data));
            },
            (error) => {
                console.log(error);
            }
        )
    }
    const getUserFromSession = () => {
        const loggedInUser = localStorage.getItem("user");
        console.log(loggedInUser)
        if (loggedInUser) {
            console.log('From Session '+JSON.stringify(loggedInUser));
            dispatch(login(true));
        }
    }
    return (
        <>
            {/* <h1>Issue List - Using Redux</h1> */}
            <Container>
                <IssuesList />
            </Container>
        </>
    )
}

export default AllIssues;