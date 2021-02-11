import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, openMenu } from '../slices/appSlice';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: `linear-gradient(45deg, #03a9f4 10%, #2196f3 90%)`,
  },
  appBarShift: {
    width: `calc(100% - 320px)`,
    marginLeft: '320',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
}));

export default function Header() {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const classes = useStyles();
  const isLogin = useSelector((state) => state.app.isLogin);
  const user = useSelector((state) => state.app.user);

  const dispatch = useDispatch();
  let history = useHistory();

  function goToSignUp(e) {
    e.preventDefault(e);
    history.push('/signUp');
  }

  function goToSignIn(e) {
    e.preventDefault(e);
    history.push('/signIn');
  }

  function logOutHandler(e) {
    e.preventDefault(e);
    history.push('/');
    dispatch(logOut());
  }

  let greetingText;

  if (isLogin) {
    greetingText = 'All Projects';
  } else {
    greetingText = 'Please Sign In';
  }

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isMenuOpen,
        })}
      >
        <Toolbar>
          <IconButton
            disabled={!isLogin}
            edge="start"
            color="inherit"
            aria-label="menu"
            className={clsx(classes.menuButton, isMenuOpen && classes.hide)}
            onClick={() => dispatch(openMenu())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {greetingText}
          </Typography>
          {isLogin && user.name && (
            <Box pr={5}>
              <Typography variant="overline" component="h2" pr={3}>
                {user.name.firstName}
              </Typography>
            </Box>
          )}
          {(!isLogin && (
            <React.Fragment>
              <Button onClick={goToSignUp} color="inherit">
                Sign Up
              </Button>
              <Button onClick={goToSignIn} color="inherit">
                Sign In
              </Button>
            </React.Fragment>
          )) || (
            <Button onClick={logOutHandler} color="inherit">
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
