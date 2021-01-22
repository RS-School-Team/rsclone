import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchLists} from '../slices/listsSlice'
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
import {tasksLoaded} from "../slices/tasksSlice";
import {
  editListOpen,
  deleteList,
  createListOpen,

} from '../slices/listsSlice'


const SideBar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(fetchLists());
  }, []);


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
                  dispatch(tasksLoaded(list));
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
                      dispatch(deleteList(list.id));
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
          onClick={() => dispatch(createListOpen())}
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
