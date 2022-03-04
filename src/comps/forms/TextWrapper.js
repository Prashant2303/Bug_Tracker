import React, { useState } from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useField } from 'formik';

const TextWrapper = ({ name, ...otherProps }) => {

    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const config = {
        ...field,
        ...otherProps,
        variant: 'outlined',
        fullWidth: true,
    }
    
    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }

    return (
        <Grid item xs={12} sm={config.sm !== undefined ? 6 : 12}>
            <TextField {...config} type={showPassword ? 'text' : config.type}
                InputProps={config.showVisibility ?
                    {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    } : null
                } />
        </Grid>
    )
}

export default TextWrapper;