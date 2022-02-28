import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import IssuesList from './issues/IssuesList';
import { useDispatch } from 'react-redux';
import { getIssuesThunk } from '../redux/issueSlice';
import { login, getUsersThunk } from '../redux/userSlice';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunk());
        dispatch(getIssuesThunk());
        getUserFromSession();
    },[])

    const getUserFromSession = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        console.log('From session storage ',loggedInUser);
        if (loggedInUser) {
            dispatch(login(loggedInUser));
        }
    }
    
    return (
        <>
            <Container>
                <IssuesList />
            </Container>
        </>
    )
}

export default Home;