import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import IssuesList from './issues/IssuesList';
import { useDispatch } from 'react-redux';
import { getIssuesThunk } from '../redux/issueSlice';
import { localSignin } from '../redux/userSlice';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIssuesThunk());
        getUserFromSession();
    }, [])

    const getUserFromSession = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        console.log('Current User', loggedInUser);
        if (loggedInUser) {
            dispatch(localSignin(loggedInUser));
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