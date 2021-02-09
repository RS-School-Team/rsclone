import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputLabel,
  Select,
  Typography,
} from '@material-ui/core';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { tasksLoaded } from '../slices/tasksSlice';

import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import { fetchOrders, fetchTeachers } from '../slices/ordersSlice';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 220,
    width: 200,
    borderRadius: 20,
  },
  addCard: {
    height: 220,
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
  messageBtn: {
    marginLeft: 'auto',
  },
  header: {
    height: 60,
    display: 'block',
    overflow: 'hidden',
  },
}));

const StudentsProcesses = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.app.token);
  useEffect(() => {
    dispatch(fetchOrders(token));
  }, []);
  const lists = useSelector((state) => state.orders.orders);

  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <FormControl variant="outlined">
        <Select
          native
          inputProps={{
            name: 'age',
            id: 'select-sort-teachers',
          }}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl> */}
      <Grid container spacing={2} justify="center">
        {(lists &&
          lists.length &&
          lists.map((list) => (
            <Grid
              item
              key={list._id}
              onClick={() => {
                dispatch(tasksLoaded(list));
              }}
            >
              <Card className={classes.root} variant="outlined">
                <RouteLink key={list._id} to={`/project/${list._id}/tasks`}>
                  <CardHeader
                    titleTypographyProps={{ variant: 'body1' }}
                    className={classes.header}
                    title={`${list.managerID.name.firstName} ${list.managerID.name.lastName}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Tasks in this list:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {list.tasks && list.tasks.length}
                    </Typography>
                  </CardContent>
                </RouteLink>

                <CardActions disableSpacing>
                  <IconButton
                    size="medium"
                    aria-label="messages"
                    className={classes.messageBtn}
                  >
                    <CommentIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))) ||
          ''}
        <Grid item>
          <Card
            className={classes.addCard}
            variant="outlined"
            onClick={() => history.push('/teachers_list')}
          >
            <IconButton size="medium" color="primary">
              <AddIcon className={classes.addCardBtn} />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default StudentsProcesses;
