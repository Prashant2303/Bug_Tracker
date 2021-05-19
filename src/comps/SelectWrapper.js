import React from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import { useField } from 'formik';

const SelectWrapper = ({ name, options, ...otherProps }) => {

    const [field, meta] = useField(name);

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
        <TextField select value='Select' style={{textAlign:'left'}} {...config} >
            {
                Object.keys(options).map((pos, option)=>{
                    return(
                        <MenuItem key={pos} value={options[pos]}>{options[pos]}</MenuItem>
                    )
                })
            }
        </TextField>
    )
}

export default SelectWrapper;