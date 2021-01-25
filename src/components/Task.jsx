import { Button, TextField, Typography, Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Task = () => {
  const { url, params } = useRouteMatch();
  const [listId] = url.match(/(?<=project\/)([\S]+?)(?=\/)/);
  const taskId = Number(params.id);
  const activeList = useSelector((state) => {
    return state.lists.lists.find((elem) => {
      return elem.id === Number(listId);
    });
  });
  const task = activeList.tasks.find((task) => task.id === taskId);
  console.log(task);
  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="large"
        color="primary"
        style={{ margin: 8 }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        style={{ margin: 8 }}
        startIcon={<DeleteIcon />}
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
