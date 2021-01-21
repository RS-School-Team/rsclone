import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Box, List, ListItem } from '@material-ui/core';
import {
  Route,
  useLocation,
  useHistory,
  Link as RouteLink,
  useRouteMatch,
} from 'react-router-dom';
import CreateList from './CreateList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';

const MainContent = () => {
  const activeList = useSelector((state) => state.tasks.activeList);
  let match = useRouteMatch();
  useEffect(() => {
    console.log(activeList);
  });
  return (
    <Box p={2}>
      <Route path="/list/:id">
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
                </ListItem>
              );
            })}
            <RouteLink to={`/create-new-task`}>
              <ListItem button style={{ height: 50 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                Add new task
              </ListItem>
            </RouteLink>
          </List>
        )}
      </Route>
    </Box>
  );
};

export default MainContent;
