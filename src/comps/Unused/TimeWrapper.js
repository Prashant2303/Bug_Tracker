import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import { useField } from 'formik';

export default function TimeWrapper({ name, ...otherProps }) {
  // The first commit of Material-UI
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
        //   id="date-picker-inline"
          label="Date picker inline"
        //   value={selectedDate}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          {...config}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
