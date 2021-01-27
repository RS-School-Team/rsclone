import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardActions, CardContent, Grid, IconButton, Typography,} from '@material-ui/core';
import {Link as RouteLink} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {tasksLoaded} from '../slices/tasksSlice';
import {createListOpen, deleteListOpen, editListOpen} from '../slices/listsSlice';
import {makeStyles} from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';

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
}));

const Projects = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.lists);
  const classes = useStyles();

  return (
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
              <RouteLink key={list.id} to={`/project/${list.id}/tasks`}>
                <CardContent>
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
                  <Typography variant="h6" gutterBottom>
                    {list.tasks && list.tasks.length}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Users doing this tasks: 0
                  </Typography>
                </CardContent>
              </RouteLink>

              <CardActions disableSpacing>
                <IconButton
                  size="medium"
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    dispatch(editListOpen(list, lists));
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="medium"
                  aria-label="delete"
                  onClick={() => {
                    dispatch(deleteListOpen(list));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
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
  );
};

export default Projects;
