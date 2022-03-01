import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { useFormikContext } from 'formik'

const ButtonWrapper = ({
    children,
    ...otherProps
}) => {

    const { submitForm } = useFormikContext()

    const handleSubmit = () => {
        submitForm();
    }

    const config = {
        variant:'contained',
        color:'primary',
        fullWidth:true,
        onClick: handleSubmit,
        ...otherProps
    }
    return(
        <Grid item xs={12}>
            <Button {...config}>
                {children}
            </Button>
        </Grid>
    )
}

export default ButtonWrapper;