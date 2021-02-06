import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import CreateList from '../CreateList';
import EditListTitle from '../EditListTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import DeleteListDialog from '../DeleteListDialog';

import { fetchLists } from '../../slices/listsSlice';
import LoadingSpinner from '../../elements/spinner/spinner';

import SwitchRouter from './Router/SwtchRouter';
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
  // const dispatch = useDispatch();
  // const history = useHistory();
  // useEffect(() => {
  //   const localUser = JSON.parse(localStorage.getItem('user'));
  //   let lists = [];
  //   if (localUser) {
  //     lists = localUser.user.projects;
  //   }
  //   if (localUser) {
  //     dispatch(localLogin(localUser.user));
  //     dispatch(localList(lists));
  //     dispatch(loginLocalUser(localUser.token));
  //     history.push('/all_projects');
  //   }
  // }, []);
  const status = useSelector((state) => state.lists.status);
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
