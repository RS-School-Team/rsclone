import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteList,
  editListOpen,
  getLists,
  getTask,
  openCreateList,
} from '../actions/listsActions';
import { Box, Divider, Drawer, List, ListItem } from '@material-ui/core';
import { Link as RouteLink, useHistory, useLocation } from 'react-router-dom';
import {
  IconButton,
  ListItemSecondaryAction,
  ListItemIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const SideBar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(getLists());
  }, []);
  console.log(lists);

  return (
    <Box overflow="auto" height="90vh">
      <List component="nav">
        <RouteLink to={`/all_tasks`}>
          <ListItem button style={{ height: 50 }}>
            All tasks
          </ListItem>
        </RouteLink>
        <Divider />
        {lists.length &&
          lists.map((list) => (
            <RouteLink key={list.id} to={`/list/${list.id}`}>
              <ListItem
                key={list.id}
                button
                style={{ height: 50 }}
                onClick={() => {
                  dispatch(getTask(list));
                }}
              >
                {list.name}
                <ListItemSecondaryAction>
                  <IconButton
                    edge="start"
                    aria-label="edit"
                    onClick={() => {
                      dispatch(editListOpen(list, lists));
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(deleteList(list.id, lists));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </RouteLink>
          ))}
        <Divider />
        <ListItem
          button
          style={{ height: 50 }}
          onClick={() => dispatch(openCreateList())}
        >
          <ListItemIcon>
            <AddIcon color="primary" />
          </ListItemIcon>
          Create new list
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
