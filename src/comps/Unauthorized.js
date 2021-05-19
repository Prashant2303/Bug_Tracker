import React from 'react'
import { Container, Grid } from '@material-ui/core'

const Unauthorized = () => {
    return (
        
        <Container>
            <h1>Please Log In to view this page</h1>
            {/* <Grid container spacing='2' xs={12}>
                <Grid item xs={12}>
                    <h1 style={{fontWeight:'normal', color:'darkgray'}}>About</h1>
                </Grid>
                <Grid item xs={12}>
                    <h4 style={{ fontWeight:'' }} >This application is used to track the status of the issues raised.</h4>
                </Grid>
            </Grid> */}
        </Container>
    )
}

export default Unauthorized;