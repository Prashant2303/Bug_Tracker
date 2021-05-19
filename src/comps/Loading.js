import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10em',
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    // border: '2px solid blue',
    justifyContent: 'center',
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{alignItems:'center'}}>
      {/* <CircularProgress /> */}
      <CircularProgress color="secondary" />
    </div>
  );
}
