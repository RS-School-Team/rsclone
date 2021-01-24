import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../slices/listsSlice';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from '@material-ui/core';
import { Link as RouteLink, useHistory, useLocation } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { tasksLoaded } from '../slices/tasksSlice';
import { editListOpen, createListOpen } from '../slices/listsSlice';
import { makeStyles } from '@material-ui/core/styles';
import { deleteListOpen } from '../slices/listsSlice';

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

const Lists = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);
  const classes = useStyles();
  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  return (
    <Box overflow="auto" height="90vh">
      <Grid container spacing={2} justify="center">
        {lists.length &&
          lists.map((list) => (
            <Grid
              item
              key={list.id}
              onClick={() => {
                dispatch(tasksLoaded(list));
              }}
            >
              <Card className={classes.root} variant="outlined">
                <RouteLink key={list.id} to={`/list/${list.id}`}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      gutterBottom
                      color="textSecondary"
                    >
                      List name:
                    </Typography>
                    <Typography
                      variant="h5"
                      gutterBottom
                      align="center"
                      style={{ fontWeight: '500' }}
                    >
                      {list.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Tasks in this list:
                    </Typography>
                    <Typography variant="h6">
                      {list.tasks && list.tasks.length}
                    </Typography>
                  </CardContent>
                </RouteLink>
                <CardActions>
                  <IconButton
                    size="small"
                    aria-label="edit"
                    color="primary"
                    onClick={() => {
                      dispatch(editListOpen(list, lists));
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={() => {
                      dispatch(deleteListOpen(list));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        <Grid item>
          <Card
            className={classes.addCard}
            variant="outlined"
            onClick={() => dispatch(createListOpen())}
          >
            <IconButton size="medium" color="primary">
              <AddIcon className={classes.addCardBtn} />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lists;
