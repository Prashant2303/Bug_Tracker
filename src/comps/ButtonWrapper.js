import React from 'react'
import { Button } from '@material-ui/core'
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
        onClick: handleSubmit
    }
    return(
        <Button {...config}>
            {children}
        </Button>
    )
}

export default ButtonWrapper;