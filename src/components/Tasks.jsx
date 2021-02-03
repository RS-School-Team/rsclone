import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, Grid, IconButton } from '@material-ui/core';

import { Link as RouteLink, useRouteMatch } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { fetchLists } from '../slices/listsSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 150,
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 20,
  },
  addCard: {
    height: 150,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  addCardBtn: {
    borderRadius: '50%',
    height: 100,
    width: 100,
  },
}));

const Tasks = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { url, params } = useRouteMatch();
  const isAdmin = useSelector((state) => state.app.isAdmin);
  const id = Number(params.id);
  const history = useHistory();
  const [activeList] = useSelector((state) => {
    return state.lists.lists.filter((elem) => {
      return elem.id === Number(id);
    });
  });
  useEffect(() => {
    dispatch(fetchLists());
  }, []);
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
          {isAdmin && (
            <Grid item>
              <Card
                className={classes.addCard}
                variant="outlined"
                onClick={() => history.push(`${url}/create-new-task`)}
              >
                <IconButton size="medium" color="primary">
                  <AddIcon className={classes.addCardBtn} />
                </IconButton>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Tasks;
