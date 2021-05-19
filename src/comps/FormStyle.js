import { makeStyles } from '@material-ui/core/styles';

const useStyles =  makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      textAlign: 'center',
      marginTop: '2em'
    },
    container:{
      paddingBottom: '2em'
    },
    heading:{
      fontWeight:'500'
    }
  }));

export default useStyles;