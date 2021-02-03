import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
import CreateList from './CreateList';
import Tasks from './Tasks';
import EditListTitle from './EditListTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Projects from './Projects';
import DeleteListDialog from './DeleteListDialog';
import SignUpForm from './SignUpForm';
import Task from './Task';
import CreateNewTask from './CreateNewTask';
import EditTask from './EditTask';
import { fetchLists } from '../slices/listsSlice';
import LoadingSpinner from '../elements/spinner/spinner';
import SignInForm from './SignInForm';
import Students from './Students';

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
  const status = useSelector((state) => state.lists.status);
  const loginStatus = useSelector((state) => state.app.status);
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const classes = useStyles();
  useEffect(() => {});
  return (
    <Box p={2} overflow="auto" height="94vh">
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isMenuOpen,
        })}
      >
        {(status === 'loading' || loginStatus === 'loading') && (
          <LoadingSpinner />
        )}
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/all_projects" component={Projects} />
          <Route exact path="/project/:id/tasks" component={Tasks} />
          <Route
            exact
            path="/project/:id/tasks/create-new-task"
            component={CreateNewTask}
          />
          <Route exact path="/project/:_id/tasks/:id" component={Task} />
          <Route
            exact
            path="/project/:id/tasks/:id/edit"
            component={EditTask}
          />
          <Route exact path="/students" component={Students} />
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
