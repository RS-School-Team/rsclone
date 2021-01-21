import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, getTask, openCreateList } from '../actions/listsActions';
import { Divider, Drawer, List, ListItem } from '@material-ui/core';
import { Link as RouteLink, useHistory, useLocation } from 'react-router-dom';
const SideBar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(getLists());
  }, []);
  let history = useHistory();
  let location = useLocation();

  return (
    <List component="nav">
      <RouteLink to={`/all_tasks`}>
        <ListItem button style={{ height: 50 }}>
          All tasks
        </ListItem>
      </RouteLink>
      <Divider />
      {lists.length &&
        lists.map((list) => (
          <RouteLink to={`/list/${list.id}`}>
            <ListItem
              key={list.id}
              button
              style={{ height: 50 }}
              onClick={() => {
                dispatch(getTask(list));
              }}
            >
              {list.name}
            </ListItem>
          </RouteLink>
        ))}
      <Divider />
      <ListItem
        button
        style={{ height: 50 }}
        onClick={() => dispatch(openCreateList())}
      >
        Create new list
      </ListItem>
    </List>
  );
};

export default SideBar;
