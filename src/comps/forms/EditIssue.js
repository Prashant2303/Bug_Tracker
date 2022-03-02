import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router';
import TextWrapper from './TextWrapper';
import SelectWrapper from './SelectWrapper'
import { Paper, Grid, Container } from '@material-ui/core';
import useStyles from './FormStyle';
import ButtonWrapper from './ButtonWrapper';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateIssueThunk } from '../../redux/issueSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const EditIssue = () => {

    const succ = () => toast.success('Issue Updated');
    const fail = () => toast.error('Something Went Wrong');

    const classes = useStyles();
    const issueToEdit = useLocation().state;
    const history = useHistory()
    const dispatch = useDispatch()

    const [submitting, setSubmitting] = useState(false)

    return (
        <Paper className={classes.paper} xs={12} elevation={5}>
            <h2 className={classes.heading}>Update issue details</h2>
            <Grid item xs={12}>
                <Container className={classes.container}>
                    <Formik
                        initialValues={{
                            desc: '',
                            severity: '',
                            status: '',
                            cdate: '',
                            rdate: ''
                        }}
                        validationSchema={Yup.object({
                            desc: Yup.string().min(3, 'Must be 3 chars').required('Issue Description is required'),
                            severity: Yup.string().required('Select Severity'),
                            status: Yup.string().required(),
                            cdate: Yup.string().matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, 'Date should be Valid and in dd/mm/yyyy or dd-mm-yyyy format').required('Required'),
                            rdate: Yup.string().matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, 'Date should be Valid and in dd/mm/yyyy or dd-mm-yyyy format')
                        })}
                        onSubmit={
                            async (values) => {
                                setSubmitting(true);
                                values.id = issueToEdit.id;
                                try {
                                    unwrapResult(await dispatch(updateIssueThunk(values)));
                                    succ();
                                    history.push('/');
                                }
                                catch (error) {
                                    console.log('Error - Http request failed');
                                    fail();
                                }
                                finally {
                                    setSubmitting(false);
                                }
                            }
                        }
                    >

                        <Form>
                            <Grid container spacing={2}>
                                <TextWrapper name='id' label='Id' value={issueToEdit.id} disabled />
                                <TextWrapper name='desc' label='Description' placeholder={issueToEdit.desc} />
                                <SelectWrapper name='severity' label='Select Severity' options={['Minor', 'Major', 'Critical']} />
                                <SelectWrapper name='status' label='Select Status' options={['Open', 'In Progress', 'Closed']} />
                                <TextWrapper name='cdate' label='Date Created' placeholder={issueToEdit.cdate} />
                                <TextWrapper name='rdate' label='Date Closed' placeholder={issueToEdit.rdate} />
                                <ButtonWrapper disabled={submitting}>{submitting === true ? 'Updating' : 'Update'}</ButtonWrapper>
                            </Grid>
                        </Form>
                    </Formik>
                </Container>
            </Grid>
        </Paper>
    )
}

export default EditIssue;