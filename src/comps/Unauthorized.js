import React from 'react'
import { Container, Grid } from '@material-ui/core'

const Unauthorized = () => {
    return (
        
        <Container>
            <Grid container spacing='2' xs={12}>
                <Grid item xs={12}>
                    <h1 style={{fontWeight:'normal'}}>Please Log In to view this page</h1>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Unauthorized;