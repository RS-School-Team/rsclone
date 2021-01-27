import {Button, Typography} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link as RouteLink} from 'react-router-dom';
import {deleteTaskOpen} from '../slices/listsSlice';

const Task = () => {
  const { url, params } = useRouteMatch();
  const dispatch = useDispatch();
  const [listId] = url.match(/(?<=project\/)([\S]+?)(?=\/)/);
  const taskId = Number(params.id);
  let activeList = useSelector((state) => {
    return state.lists.lists.find((elem) => {
      return elem.id === Number(listId);
    });
  });
  let task;
  if (activeList) {
    task = activeList.tasks.find((task) => task.id === taskId);
  }
  return (
    <React.Fragment>
      <RouteLink to={`${url}/edit`}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ margin: 8 }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </RouteLink>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        style={{ margin: 8 }}
        startIcon={<DeleteIcon />}
        onClick={() => dispatch(deleteTaskOpen(task))}
      >
        Delete
      </Button>

      <Typography
        variant="h4"
        align="center"
        style={{ marginTop: 20, marginBottom: 50 }}
      >
        {task && task.title}
      </Typography>
      <Typography
        variant="body1"
        style={{
          fontSize: '1.5rem',
          marginLeft: 10,
        }}
      >
        {task && task.description}
      </Typography>
    </React.Fragment>
  );
};

export default Task;
