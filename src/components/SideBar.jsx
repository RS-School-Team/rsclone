import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, getTask } from '../actions/listsActions';
import { Divider, Drawer, List, ListItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
const SideBar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getLists());
  }, []);

  return (
    <List component="nav">
      <NavLink to={`/all_tasks`}>
        <ListItem button style={{ height: 50 }}>
          All tasks
        </ListItem>
      </NavLink>
      <Divider />
      {lists.length &&
        lists.map((list) => (
          <NavLink key={list.id} to={`/list/${list.id}`}>
            <ListItem
              button
              style={{ height: 50 }}
              onClick={() => {
                dispatch(getTask(list));
              }}
            >
              {list.name}
            </ListItem>
          </NavLink>
        ))}
      <Divider />
      <ListItem button style={{ height: 50 }}>
        Create new list
      </ListItem>
    </List>
  );
};

export default SideBar;
