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
import { openMenu } from '../slices/appSlice';
import { openLogin } from '../slices/headerSlice';
import {Link as RouteLink} from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  const isLogin = useSelector((state) => state.header.isLogin);
  const dispatch = useDispatch();
  let history = useHistory();

  function goToSignUp(e) {
    e.preventDefault(e)
    history.push("/signUp");
  }
  function goToSignIn(e) {
    e.preventDefault(e)
    history.push("/signIn");
  }

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isMenuOpen,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={clsx(classes.menuButton, isMenuOpen && classes.hide)}
            onClick={() => dispatch(openMenu())}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            All Projects
          </Typography>
          {!isLogin &&
            <Button onClick = {goToSignUp} color="inherit">
              Sign Up
            </Button>
          }
            <Button onClick = {goToSignIn} color="inherit">
              {isLogin ? 'Sign Out' : 'Sign In'}
            </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}
