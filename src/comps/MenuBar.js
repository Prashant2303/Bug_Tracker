import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Typography } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import toast from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: '5px'
  },
  grow: {
    flexGrow: 1,
    padding: '10px'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuButtons: {
    color: 'black',
    [theme.breakpoints.up('sm')]: {
      color: 'white',
    },
    textDecoration: 'none'
  },
  activeButton: {
    color: 'lightgrey'
  }
}));

export default function MenuBar() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.loginStatus);
  
  const succ = () => toast.success('Logged Out Successfully');
  const handleLogout = () => {
    dispatch(logout())
    handleMobileMenuClose()
    succ()
  }

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null); //I think its to decide where the menu should open on screen
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        isLoggedIn ? <MenuItem onClick={handleLogout}>Sign out</MenuItem>
          : <MenuItem onClick={handleMobileMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/signin">Sign In</NavLink> </MenuItem>
      }
      <MenuItem onClick={handleMobileMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/chart">Chart</NavLink></MenuItem>
      <MenuItem onClick={handleMobileMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/about">About</NavLink></MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>

          <Typography variant="h6">
            <NavLink exact activeClassName="active" style={{ color: 'white', textDecorationLine: 'none' }} to="/">Bug Tracker</NavLink>
          </Typography>

          <div className={classes.grow} />  {/*{display:flex, justifycontent: space-between} can be added to Toolbar for same effect*/}

          <div className={classes.sectionDesktop}>
            <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/">Home</NavLink></Button>
            {isLoggedIn ? <Button color="inherit" onClick={handleLogout}>Sign Out</Button>
              : <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/signin">Sign In</NavLink></Button>}
            <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/chart">Chart</NavLink></Button>
            <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/about">About</NavLink></Button>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" color="inherit">
              <MoreIcon />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
