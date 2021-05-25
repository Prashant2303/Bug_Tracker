import React ,{useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import base_url from '../service/api';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/issueSlice';
import TextWrapper from './TextWrapper';
import SelectWrapper from './SelectWrapper'
import { Paper, Grid, Container} from '@material-ui/core';
import useStyles from './FormStyle';
import ButtonWrapper from './ButtonWrapper';
import { Prompt, useHistory } from 'react-router-dom'

const AddIssueFormik = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const listInStore = useSelector(state => state.handler.list);
    const history = useHistory();
    // useEffect(()=>{

    //     //https://dev.to/robmarshall/how-to-use-componentwillunmount-with-functional-components-in-react-2a5g
    //     return () => {
            
    //         // alert('You Sure ?')
    //         console.log('Unmounting')
    //     }
    // },[])
    //Error on page reload
    // console.log('ListInStore '+JSON.stringify(listInStore));
    const [changed, setChanged] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    return (
        <Paper className={classes.paper} xs={12} elevation={5}>
            <Prompt when={changed} message="Are you sure you want to leave?" />
            <h2 className={classes.heading}> Enter issue details </h2>
            <Grid item xs={12}>
                <Container className={classes.container}>
                    <Formik
                        initialValues={{
                            desc: '',
                            severity: '',
                            status: '',
                            cdate:'',
                            rdate:''
                        }}
                        validationSchema={Yup.object({
                            desc: Yup.string().min(3, 'Must be 3 chars').required('Issue Description is required'),
                            severity: Yup.string().required('Required'),
                            status: Yup.string().required('Required'),
                            cdate: Yup.string().matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,'Date should be Valid and in dd/mm/yyyy or dd-mm-yyyy format').required('Required'),
                            rdate: Yup.string().matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,'Date should be Valid and in dd/mm/yyyy or dd-mm-yyyy format')
                            //https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
                        })}
                        onSubmit={(values) => {
                            console.log(JSON.stringify(values));
                            // console.log('This is setSubmitting '+ setSubmitting +' yeah'+ isSubmitting);
                            setSubmitting(true);
                            
                            let lastId = listInStore==null ? 0 : listInStore[listInStore.length - 1].id;
                            values.id = lastId + 1;
                            values.viewed = 1;
                            axios.post(`${base_url}/issues`, values).then(
                                (response) => {
                                    // console.log('Before Add '+ JSON.stringify(listInStore));
                                    dispatch(add(values));
                                    setChanged(false);
                                    setSubmitting(false);
                                    alert('Issue Added')
                                    history.push('/');
                                    // console.log('After Add '+ JSON.stringify(listInStore));
                                },
                                (error) => {
                                    setSubmitting(false);
                                    alert('Issue could not be added')
                                }
                            )
                        }}
                    >

                        <Form>    
                            <Grid container spacing={2}>
                                
                                <Grid item xs={12}>
                                    <TextWrapper name='desc' label='Description' />
                                </Grid>

                                <Grid item xs={12}>
                                    <SelectWrapper name='severity' label='Select Severity' options={['Minor','Major','Critical']}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <SelectWrapper name='status' label='Select Status' options={['Open','In Progress','Closed']}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextWrapper name='cdate' label='Date Created' />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextWrapper name='rdate' label='Date Closed' />
                                </Grid>
                            
                                <Grid item xs={12}>
                                    <ButtonWrapper disabled={submitting}> {submitting==true?'Adding':'Add'} </ButtonWrapper>
                                    {/* <ButtonWrapper>Add</ButtonWrapper> */}
                                </Grid>

                            </Grid>
                        </Form>
                    </Formik>
                </Container>
            </Grid>
        </Paper>
    )
}

export default AddIssueFormik;