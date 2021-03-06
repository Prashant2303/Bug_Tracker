import './App.css';
import { Suspense, lazy } from 'react';
import Home from './comps/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Loading from './comps/Loading';
import { useSelector } from 'react-redux';
import VerticalBar from './comps/Chart';
import MenuBar from './comps/MenuBar';
import { Toaster } from 'react-hot-toast';
import SignIn from './comps/forms/SignIn';
import SignUp from './comps/forms/SignUp';
const AddIssueFormik = lazy(() => import('./comps/forms/AddIssue-Formik'));
const IssueDetail = lazy(() => import('./comps/issues/IssueDetail'));
const EditIssue = lazy(() => import('./comps/forms/EditIssue'));
const About = lazy(() => import('./comps/About'));

const Login = lazy(() => import('./comps/Old/Login'));
const OldSignup = lazy(() => import('./comps/Old/OldSignup'));
const Auth = lazy(() => import('./comps/Old/Auth'));
const Unauthorized = lazy(() => import('./comps/Old/Unauthorized'));

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
        <Route path='/addIssue' exact > {isLoggedIn ? <AddIssueFormik /> : <SignIn />} </Route>
        <Route path='/issueDetails' exact><IssueDetail /></Route>
        <Route path='/editIssue' exact><EditIssue /></Route>
        <Route path='/chart' exact><VerticalBar /></Route>
        <Route path='/signin' exact><SignIn /></Route>
        <Route path='/signup' exact><SignUp /></Route>

        <Route path='/login' exact><Login /></Route>
        <Route path='/oldsignup' exact><OldSignup /></Route>
        <Route path='/auth' exact><Auth /></Route>
        <Route path='/unauth' exact><Unauthorized /></Route>
      </Router>
    </Suspense>
  );
}

export default App;
export { App };