import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addIssueThunk } from '../../redux/issueSlice';
import TextWrapper from './TextWrapper';
import SelectWrapper from './SelectWrapper'
import { Paper, Grid, Container } from '@material-ui/core';
import useStyles from './FormStyle';
import ButtonWrapper from './ButtonWrapper';
import { Prompt, useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import { unwrapResult } from '@reduxjs/toolkit';

const AddIssueFormik = () => {

    const succ = () => toast.success('Issue Added');
    const fail = () => toast.error('Something Went Wrong');

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const listInStore = useSelector(state => state.handler.list);
    const currentUser = useSelector(state => state.user.authData);
    
    const [changed, setChanged] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    return (
        <Paper className={classes.paper} xs={12} elevation={5}>
            <Prompt when={changed} message="Are you sure you want to leave?" />
            <h2 className={classes.heading}>Enter issue details</h2>
            <Grid item xs={12}>
                <Container className={classes.container}>
                    <Formik
                        initialValues={{
                            desc: '',
                            severity: '',
                            status: ''
                        }}
                        validationSchema={Yup.object({
                            desc: Yup.string().min(3, 'Must be 3 chars').required('Issue Description is required'),
                            severity: Yup.string().required('Required'),
                            status: Yup.string().required('Required')
                        })}
                        onSubmit={async (values) => {
                            setSubmitting(true);
                            try {
                                let maxId = 0;
                                for (let i = 0; i < listInStore.length; i++) {
                                    maxId = Math.max(maxId, listInStore[i].id)
                                }
                                values.id = maxId + 1;
                                values.viewed = 1;
                                values.title = '';
                                values.creatorName = currentUser.name;
                                values.creatorId = currentUser._id;
                                values.cdate = new Date().toString();
                                unwrapResult(await dispatch(addIssueThunk(values)));
                                setChanged(false);
                                history.push('/');
                                succ();
                            }
                            catch (err) {
                                console.log('Error - Http request failed');
                                fail();
                            }
                            finally {
                                setSubmitting(false);
                            }
                        }}
                    >

                        <Form>
                            <Grid container spacing={2}>
                                <TextWrapper name='desc' label='Description' />
                                <SelectWrapper name='severity' label='Select Severity' options={['Minor', 'Major', 'Critical']} />
                                <SelectWrapper name='status' label='Select Status' options={['Open', 'In Progress', 'Closed']} />
                                <ButtonWrapper disabled={submitting}> {submitting === true ? 'Adding' : 'Add'} </ButtonWrapper>
                            </Grid>
                        </Form>
                    </Formik>
                </Container>
            </Grid>
        </Paper>
    )
}

export default AddIssueFormik;