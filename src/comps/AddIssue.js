import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Formik } from 'formik';
import AddIssueFormik from './AddIssue-Formik';
import SignupForm from './FormikHook';

const AddIssue = (props) => {

    const [issueDetails,setIssue] = useState({ desc:'', severity:'minor', status:'' });

    const handleDesc = (e) => {
        setIssue({...issueDetails,desc:e.target.value});
    }
    const handleSeverity = (e) => {
        setIssue({...issueDetails,severity:e.target.value});
    }
    const handleStatus = (e) => {
        setIssue({...issueDetails,status:e.target.value});
    }
    const handleSubmit = (formData) => {
        console.log(JSON.stringify(issueDetails));
        alert(`${issueDetails.desc} ${issueDetails.severity} ${issueDetails.status}`);
        formData.preventDefault();
    }
    
    return (
        <>
            <h1>Add Issue</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="desc">
                        Description: <Input style={{marginLeft:10, width:350}} type="text" name="desc" id="desc" value={issueDetails.desc} onChange={handleDesc} placeholder="Enter Issue Description" />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label for="severity">Severity:
                    <select value={issueDetails.severity} onChange={handleSeverity} style={{marginLeft:39.5}}>
                        <option value='minor'>Minor</option>
                        <option value='major'>Major</option>
                        <option value='critical'>Critical</option>
                    </select>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Status: </Label>
                    <Input style={{marginLeft:47}} type="radio" name="status" value='open' onChange={handleStatus}/>{' '}Open
                    <Input type="radio" name="status" value='progress' onChange={handleStatus}/>{' '}In Progress
                    <Input type="radio" name="status" value='closed' onChange={handleStatus}/>{' '}Closed
                </FormGroup>
                <Button type='submit' style={{marginTop:20}} >Submit</Button>
            </Form>
            <AddIssueFormik />
            {/* <SignupForm /> */}
        </>
    );
}

export default AddIssue;