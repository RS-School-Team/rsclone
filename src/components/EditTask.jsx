import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from 'react-router-dom';
import { editTask } from '../slices/listsSlice';
const EditTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url, params } = useRouteMatch();
  const [listId] = url.match(/(?<=project\/)([\S]+?)(?=\/)/);
  const taskId = Number(params.id);
  const activeList = useSelector((state) => {
    return state.lists.lists.find((elem) => {
      return elem.id === Number(listId);
    });
  });
  let task;
  if (activeList) {
    task = activeList.tasks.find((task) => task.id === taskId);
  }
  let title, description;
  const handleChandeTitle = (event) => {
    title = event.target.value;
  };
  const handleChandeDescription = (event) => {
    description = event.target.value;
  };
  const handleClose = () => {
    history.push(`${url.replace('/edit', '')}`);
  };
  const handleSaveClick = () => {
    dispatch(editTask({ title, description, id: taskId }));
    handleClose();
  };
  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="large"
        color="primary"
        style={{ margin: 8 }}
        startIcon={<SaveIcon />}
        onClick={() => handleSaveClick()}
      >
        Save
      </Button>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        style={{ margin: 8 }}
        startIcon={<CancelIcon />}
        onClick={() => handleClose()}
      >
        Cancel
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        Edit task {task && task.title}
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          id="task-title"
          label="Task title"
          style={{ marginBottom: 40, marginTop: 40 }}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          defaultValue={task && task.title}
          onChange={handleChandeTitle}
        />
        <TextField
          id="task-description"
          label="Task description"
          style={{ marginBottom: 40 }}
          required
          fullWidth
          margin="normal"
          multiline
          rows={8}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={task && task.description}
          onChange={handleChandeDescription}
        />
      </form>
    </React.Fragment>
  );
};

export default EditTask;
