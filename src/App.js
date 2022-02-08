import './App.css';
import { Suspense, lazy } from 'react';
import Home from './comps/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Loading from './comps/Loading';
import Login from './comps/Login';
import Unauthorized from './comps/Unauthorized';
import { useSelector } from 'react-redux';
import VerticalBar from './comps/Chart';
import MenuBar from './comps/MenuBar';
import { Toaster } from 'react-hot-toast';
const AddIssueFormik = lazy(() => import('./comps/AddIssue-Formik'));
const IssueDetail = lazy(() => import('./comps/issues/IssueDetail'));
const EditIssue = lazy(() => import('./comps/EditIssue'));
const Signup = lazy(() => import('./comps/Signup'));
const About = lazy(() => import('./comps/About'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '1em'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuButtons: {
    color: 'white',
    textDecoration: 'none'
  },
  activeButton: {
    color: 'lightgrey'
  }
}));

function App() {

  const classes = useStyles();
  const isLoggedIn = useSelector(state => state.user.loginStatus);

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Toaster />
        <div className={classes.root}>
          <MenuBar />
        </div>
        <Route path='/' exact > <Home /> </Route>
        <Route path='/about' exact > <About /> </Route>
        <Route path='/issues' exact > <Home /> </Route>
        <Route path='/addIssue' exact > {isLoggedIn ? <AddIssueFormik /> : <Unauthorized />} </Route>
        <Route path='/issueDetails' exact><IssueDetail /></Route>
        <Route path='/signup' exact><Signup /></Route>
        <Route path='/editIssue' exact><EditIssue /></Route>
        <Route path='/login' exact><Login /></Route>
        <Route path='/chart' exact><VerticalBar /></Route>
        {/* <Route path='/menu' exact><MenuBar /></Route> */}

      </Router>
    </Suspense>
  );
}

export default App;
export { App };