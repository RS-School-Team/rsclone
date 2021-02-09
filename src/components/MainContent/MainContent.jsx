import React, { useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import clsx from 'clsx';
import CreateList from '../CreateList';
import EditListTitle from '../EditListTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import DeleteListDialog from '../DeleteListDialog';

import LoadingSpinner from '../../elements/spinner/spinner';

import SwitchRouter from './Router/SwitchRouter';
import { localList } from '../../slices/listsSlice';
import { localLogin, loginLocalUser } from '../../slices/appSlice';
import { useHistory } from 'react-router-dom';

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
  const isLogin = useSelector((state) => state.app.isLogin);
  const status = useSelector((state) => state.app.status);
  const dispatch = useDispatch();
  const history = useHistory();

  const hasToken = () => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal && userLocal.token) {
      const { token, user } = userLocal;
      return { token, user };
    }
  };

  useEffect(() => {
    if (!isLogin && hasToken()) {
      const { token, user } = hasToken();
      dispatch(loginLocalUser(token));

      if (user.statusCode === 401) {
        history.push('/signIn');
      } else if (user.manager && history.location.pathname === '/signIn') {
        history.push('/all_projects');
      } else if (!user.manager && history.location.pathname === '/signIn') {
        history.push('/all_processes');
      }
    }
  }, []);
  const loginStatus = useSelector((state) => state.app.status);
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const classes = useStyles();
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
        <SwitchRouter />
        <CreateList />
        <EditListTitle />
        <DeleteListDialog />
      </main>
    </Box>
  );
};

export default MainContent;
