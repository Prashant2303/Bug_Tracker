import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Button, Grid } from '@material-ui/core'

const IssueDetail = () => {
    
    const issue = useLocation().state;
    const style = {fontWeight:'bold'}
    return(
        
        <Container>
            <Grid spacing={2} container>
                <Grid item xs={12} >
                    <h1 style={{fontWeight:'normal', color:'darkgray'}}>Issue Details</h1>
                </Grid>

                <Grid item xs={12}>
                    <span style={style}>Id: </span>{issue.id}<br/>
                </Grid>

                <Grid item xs={12}>
                    <span style={style}>Description: </span>{issue.desc}<br/>
                </Grid>
                <Grid item xs={12}>
                    <span style={style}>Severity: </span>{issue.severity}<br/>
                </Grid>
                <Grid item xs={12}>
                    <span style={style}>Status: </span>{issue.status}<br/>
                </Grid>
                <Grid item xs={12}>
                    <span style={style}>Creation Date: </span>{issue.cdate}<br/>
                </Grid>
                {
                    issue.status==='Closed'?
                    <Grid item xs={12}>
                        <span style={style}>Closing Date: </span>{issue.rdate}<br/>
                    </Grid>:null
                }
                <Grid item xs={12}>
                    <span style={style}>Viewed: </span>{issue.viewed} times<br/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' size='small'><Link to='/issues' style={{textDecoration:'none'}}>Back</Link></Button>
                </Grid>

            {/* <h4 style={{ fontWeight:'' }} >This application is used to track the status of the issues raised.</h4> */}
            </Grid>
        </Container>
    )
}

export default IssueDetail;