import React,{ useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import base_url from '../../service/api';
import { useLocation } from 'react-router';
import TextWrapper from './TextWrapper';
import SelectWrapper from './SelectWrapper'
import { Paper, Grid, Container } from '@material-ui/core';
import useStyles from './FormStyle';
import ButtonWrapper from './ButtonWrapper';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditIssue = () => {

    const succ = () => toast.success('Issue Updated');
    const fail = () => toast.error('Something Went Wrong');

    const classes = useStyles();
    const issueToEdit = useLocation().state;
    const history = useHistory()

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
                            cdate: Yup.string().matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,'Date should be Valid and in dd/mm/yyyy or dd-mm-yyyy format').required('Required'),
                            rdate: Yup.string().matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,'Date should be Valid and in dd/mm/yyyy or dd-mm-yyyy format')
                        })}
                        onSubmit={(values) => {

                            setSubmitting(true)
                            values.id = issueToEdit.id;

                            axios.put(`${base_url}/issues/${issueToEdit.id}`, values).then(
                                (response) => {
                                    setSubmitting(false)
                                    // alert('Issue Updated')
                                    succ()
                                    history.push('/')
                                },
                                (error) => {
                                    setSubmitting(false)
                                    fail()
                                    // alert('Issue could not be Updated')
                                }
                            )
                        }}
                    >

                        <Form>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextWrapper name='id' label='Id' value={issueToEdit.id} disabled />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextWrapper name='desc' label='Description' placeholder={issueToEdit.desc} />
                                </Grid>

                                <Grid item xs={12}>
                                    <SelectWrapper name='severity' label='Select Severity' options={['Minor','Major','Critical']}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <SelectWrapper name='status' label='Select Status' options={['Open','In Progress','Closed']}/>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextWrapper name='cdate' label='Date Created' placeholder={issueToEdit.cdate} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextWrapper name='rdate' label='Date Closed' placeholder={issueToEdit.rdate}/>
                                </Grid>
                            
                                <Grid item xs={12}>
                                    <ButtonWrapper disabled={submitting}>{ submitting==true?'Updating':'Update' }</ButtonWrapper>
                                </Grid>

                            </Grid>
                        </Form>
                    </Formik>
                </Container>
            </Grid>
        </Paper>
    )
}

export default EditIssue;