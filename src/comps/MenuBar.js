import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Badge, Button, Typography } from '@material-ui/core';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/userSlice';
import toast from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButtons: {
    color:'black',
    [theme.breakpoints.up('md')]: {
      color: 'white',
    },
    textDecoration:'none'
  },
  activeButton:{
    color:'lightgrey'
  }
}));

export default function MenuBar() {

  const succ = () => toast.success('Logged Out Successfully');
  // const fail = () => toast.error('Something Went Wrong');

  const isLoggedIn = useSelector(state=>state.user.loginStatus);
  console.log(isLoggedIn)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    handleMenuClose()
    succ()
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem  onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

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
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
      {isLoggedIn?
        <MenuItem onClick={handleLogout}> Sign Out </MenuItem>
        :<>  
       <MenuItem onClick={handleMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/signin">Sign In</NavLink> </MenuItem>
       <MenuItem onClick={handleMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/login">Log In</NavLink> </MenuItem>
       <MenuItem onClick={handleMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/signup">Sign Up</NavLink> </MenuItem>
      </>}
      <MenuItem onClick={handleMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/chart">Chart</NavLink></MenuItem>
      <MenuItem onClick={handleMenuClose}><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/about">About</NavLink></MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
              <NavLink exact activeClassName="active" style={{color:'white',textDecorationLine:'none'}} to="/">Bug Tracker</NavLink>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          
          <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/signin">SignIn</NavLink></Button>
          <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/">Home</NavLink></Button>
          {isLoggedIn?<Button color="inherit" onClick={handleLogout}>Log Out</Button>:<>  
            <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/login">Log In</NavLink></Button>
            <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/signup">Sign Up</NavLink></Button>
          </>}
          <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/chart">Chart</NavLink></Button>
          <Button><NavLink exact activeClassName={classes.activeButton} className={classes.menuButtons} to="/about">About</NavLink></Button>
 
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
}
