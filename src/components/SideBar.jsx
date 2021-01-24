import React from 'react';
import { Divider, Drawer, IconButton, List, ListItem } from '@material-ui/core';
import { Link as RouteLink } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { closeMenu } from '../slices/appSlice';
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
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Drawer variant="persistent" anchor="left" open={isOpen}>
      <div className={classes.drawerHeader}>
        <IconButton color="primary" onClick={() => dispatch(closeMenu())}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List component="nav">
        <RouteLink to={`/all_tasks`}>
          <ListItem button style={{ height: 50, width: 320 }}>
            All tasks
          </ListItem>
        </RouteLink>
      </List>
    </Drawer>
  );
};

export default Sidebar;
