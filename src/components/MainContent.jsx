import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import {
  Route,
  Link as RouteLink,
  useRouteMatch,
  Switch,
} from 'react-router-dom';


import CreateList from './CreateList.tsx';
import Tasks from './Tasks';
import EditListTitle from './EditListTitle.rsx';

const MainContent = () => {
  return (
    <Box p={2} overflow="auto" height="86vh">
      <CreateList />
      <EditListTitle />
      <Switch>
        <Route exact path="/list/:id" component={Tasks} />
      </Switch>
    </Box>
  );
};

export default MainContent;
