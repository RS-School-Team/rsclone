import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import {
  Route,
  Link as RouteLink,
  useRouteMatch,
  Switch,
} from 'react-router-dom';

import CreateList from './CreateList';
import Tasks from './Tasks';
import EditListTitle from './EditListTitle';
import CreateNewTask from './CreateNewTask';
import DeleteListDialog from './DeleteListDialog';

const MainContent = () => {
  return (
    <Box p={2} overflow="auto" height="86vh">
      <DeleteListDialog />
      <CreateList />
      <EditListTitle />
      <Switch>
        <Route exact path="/list/:id" component={Tasks} />
        <Route
          exact
          path="/list/:id/create-new-task"
          component={CreateNewTask}
        />
      </Switch>
    </Box>
  );
};

export default MainContent;
