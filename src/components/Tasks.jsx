import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Route, Link as RouteLink, useRouteMatch } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';

const Tasks = ({ match }) => {
  const { id } = match.params;
  const [activeList] = useSelector((state) => {
    return state.lists.lists.filter((elem) => {
      return elem.id === Number(id);
    });
  });
  return (
    <React.Fragment>
      <Typography variant="h4" align="center" gutterBottom>
        {activeList && activeList.name}
      </Typography>
      {activeList && activeList.tasks && !activeList.tasks.length && (
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          There is no tasks in this list
        </Typography>
      )}
      {activeList && activeList.tasks && (
        <List>
          {activeList.tasks.map((task) => {
            return (
              <ListItem button key={task.id} style={{ height: 50 }}>
                {task.text}
                <ListItemSecondaryAction>
                  <IconButton aria-label="delete">
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
          <RouteLink to={`/create-new-task`}>
            <ListItem button style={{ height: 50 }}>
              <ListItemIcon>
                <AddIcon color="primary" />
              </ListItemIcon>
              Add new task
            </ListItem>
          </RouteLink>
        </List>
      )}
    </React.Fragment>
  );
};

export default Tasks;
