import React from 'react';
import { Divider, Drawer, IconButton, List, ListItem } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../slices/appSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Sidebar = () => {
  const isOpen = useSelector((state) => state.app.isMenuOpen);
  const { manager } = useSelector((state) => state.app.user);

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="persistent" anchor="left" open={isOpen}>
        <div className={classes.drawerHeader}>
          <IconButton color="primary" onClick={() => dispatch(closeMenu())}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List component="nav">
          {manager ? (
            <React.Fragment>
              <ListItem
                button
                style={{ height: 50, width: 320 }}
                onClick={() => {
                  history.push('/all_projects');
                  dispatch(closeMenu());
                }}
              >
                All projects
              </ListItem>
              <ListItem
                button
                style={{ height: 50, width: 320 }}
                onClick={() => {
                  history.push('/students');
                  dispatch(closeMenu());
                }}
              >
                Your students
              </ListItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ListItem
                button
                style={{ height: 50, width: 320 }}
                onClick={() => {
                  history.push('/all_processes');
                  dispatch(closeMenu());
                }}
              >
                All processes
              </ListItem>
              <ListItem
                button
                style={{ height: 50, width: 320 }}
                onClick={() => {
                  history.push('/teachers');
                  dispatch(closeMenu());
                }}
              >
                Your teachers
              </ListItem>
            </React.Fragment>
          )}
          <ListItem
            button
            style={{ height: 50, width: 320 }}
            onClick={() => {
              history.push(`/user-id`);
              dispatch(closeMenu());
            }}
          >
            Your account
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
