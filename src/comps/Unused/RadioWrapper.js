import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useField } from 'formik';

export default function RadioButtonsGroup({ name, ...otherProps }) {
//   const [value, setValue] = React.useState('female');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

    const [field, meta] = useField(name);

    const config = {
        ...field,
        ...otherProps,
        // variant: 'outlined',
        // fullWidth: true
    }

    if (meta && meta.touched && meta.error) {
        config.error = true;
        config.helperText = meta.error;
    }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Status</FormLabel>
      <RadioGroup aria-label="gender" {...config} >
        <FormControlLabel value="Open" control={<Radio />} label="Open" />
        <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
        <FormControlLabel value="Closed" control={<Radio />} label="Closed" />
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
    </FormControl>
  );
}
