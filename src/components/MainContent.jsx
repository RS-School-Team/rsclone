import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import {
  Route,
  Link as RouteLink,
  useRouteMatch,
  Switch,
} from 'react-router-dom';
import clsx from 'clsx';

import CreateList from './CreateList';
import Tasks from './Tasks';
import EditListTitle from './EditListTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Projects from './Projects';
import DeleteListDialog from './DeleteListDialog';
import { fetchLists } from '../slices/listsSlice';
import LoginModal from './LoginModal';
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 320,
  },
}));

const MainContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLists());
  }, []);
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const classes = useStyles();
  return (
    <Box p={2} overflow="auto" height="94vh">
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isMenuOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/all_projects" component={Projects} />
          <Route exact path="/list/:id" component={Tasks} />
          <Route exact path="/signUp" component={SignUpForm} />
          <Route exact path="/signIn" component={SignInForm} />
        </Switch>
        <CreateList />
        <EditListTitle />
        <DeleteListDialog />
      </main>
    </Box>
  );
};

export default MainContent;
