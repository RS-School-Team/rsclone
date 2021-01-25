import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
} from '@material-ui/core';

import { Link as RouteLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { tasksLoaded } from '../slices/tasksSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 150,
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  addCard: {
    height: 150,
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
  const { url } = match;
  const { id } = match.params;
  const [activeList] = useSelector((state) => {
    return state.lists.lists.filter((elem) => {
      return elem.id === Number(id);
    });
  });
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        align="center"
        style={{ marginTop: 40, marginBottom: 50 }}
      >
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
                  <RouteLink key={task.id} to={`${url}/${task.id}`}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        align="center"
                        style={{ fontWeight: '500' }}
                      >
                        {task.title}
                      </Typography>
                    </CardContent>
                  </RouteLink>
                </Card>
              </Grid>
            );
          })}
          <Grid item>
            <Card className={classes.addCard} variant="outlined">
              <RouteLink to={`${url}/create-new-task`}>
                <IconButton
                  size="medium"
                  color="primary"
                  onClick={() => dispatch(tasksLoaded(activeList))}
                >
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
