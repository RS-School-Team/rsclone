import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { activeList2, fetchLists } from '../slices/listsSlice';

import { Route, Link as RouteLink, useRouteMatch } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    width: 200,
  },
  addCard: {
    height: 200,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCardBtn: {
    borderRadius: '50%',
    height: 100,
    width: 100,
  },
}));

const Tasks = ({ match }) => {
  const classes = useStyles();
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
        <Grid container spacing={2} justify="center">
          {activeList.tasks.map((task) => {
            return (
              <Grid item key={task.id}>
                <Card className={classes.root} variant="outlined">
                  <RouteLink key={task.id} to={`/tasks/${task.id}`}>
                    <CardContent>
                      <Typography
                        variant="body2"
                        gutterBottom
                        color="textSecondary"
                      >
                        Task name:
                      </Typography>
                      <Typography
                        variant="h5"
                        gutterBottom
                        align="center"
                        style={{ fontWeight: '500' }}
                      >
                        {task.text}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        aria-label="edit"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </RouteLink>
                </Card>
              </Grid>
            );
          })}
          <Grid item>
            <Card className={classes.addCard} variant="outlined">
              <RouteLink to={`/create-new-task`}>
                <IconButton size="medium" color="primary">
                  <AddIcon className={classes.addCardBtn} />
                </IconButton>
              </RouteLink>
            </Card>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Tasks;
