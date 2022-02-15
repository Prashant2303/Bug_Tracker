import React from 'react'
import {TextField} from '@material-ui/core'
import { useField } from 'formik';

const TextWrapper = ({name, ...otherProps}) => {
    
    const [field, meta] = useField(name);

    const config = {
        ...field,
        ...otherProps,
        variant:'outlined', 
        fullWidth:true,
    }
    // console.log(JSON.stringify(config))
    if(meta && meta.touched && meta.error){
        config.error = true;
        config.helperText = meta.error;
    }

    return (
        <TextField {...config} />
    )
}

export default TextWrapper;