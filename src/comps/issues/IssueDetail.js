import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Button, Grid } from '@material-ui/core'

const IssueDetail = () => {

    const issue = useLocation().state;

    const Field = (key, value) => (
        <Grid item xs={12}>
            <span style={{ fontWeight: 'bold' }}>{key}: </span>{value}<br />
        </Grid>
    )
    return (
        <Container>
            <Grid spacing={2} container>
                <Grid item xs={12} >
                    <h1 style={{ fontWeight: 'normal', color: 'darkgray' }}>Issue Details</h1>
                </Grid>
                {Field('Id', issue.id)}
                {Field('Title', issue.title)}
                {Field('Description', issue.desc)}
                {Field('Severity', issue.severity)}
                {Field('Status', issue.status)}
                {Field('Creator', issue.creatorName)}
                {Field('Created On', issue.cdate)}
                {Field('Resolved On', issue.status === 'Closed' ? issue.rdate : 'Not yet resolved')}
                {Field('Viewed', issue.viewed)}
                <Grid item xs={12}>
                    <Button variant='outlined' size='small'><Link to='/issues' style={{ textDecoration: 'none' }}>Back</Link></Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default IssueDetail;