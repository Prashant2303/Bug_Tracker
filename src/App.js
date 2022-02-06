import logo from './logo.svg';
import './App.css';
import { useState, Suspense, lazy } from 'react';
import Home from './comps/Home';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, useHistory} from "react-router-dom";
// import AddIssue from './comps/AddIssue';
import { Button, Container, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './comps/Loading';
import Login from './comps/Login';
import Unauthorized from './comps/Unauthorized';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './redux/userSlice';
import VerticalBar from './comps/Chart';
import MenuBar from './comps/MenuBar';
import { Toaster } from 'react-hot-toast';
const AddIssueFormik = lazy(() => import('./comps/AddIssue-Formik'));
const IssueDetail = lazy(() => import('./comps/IssueDetail'));
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
    color:'white',
    textDecoration:'none'
  },
  activeButton:{
    color:'lightgrey'
  }
}));

function App() {

  const classes = useStyles();
  const isLoggedIn = useSelector(state=>state.user.loginStatus);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(login(false))
    // history.push('/');
  }
  
  return (
    <Suspense fallback={<Loading/>}>
    <Router>
        <Toaster/>
        <div className={classes.root}>
          <MenuBar/>
        </div>

        {/* <Link to='/' >About</Link>
        <Link style={{marginLeft:20}} to='/issues' >Issues</Link> */}
        {/* <NavLink exact activeClassName="active" to="/">About</NavLink>
        <NavLink exact activeClassName="active" style={{marginLeft:20}} to="/issues">Issues</NavLink>
        <NavLink exact activeClassName="active" style={{marginLeft:20}} to="/signup">Sign Up</NavLink> */}
        <Route path='/' exact > <Home /> </Route>
        <Route path='/about' exact > <About /> </Route>
        <Route path='/issues' exact > <Home /> </Route>
        <Route path='/addIssue' exact > {isLoggedIn? <AddIssueFormik />: <Unauthorized />} </Route>
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
export {App};