import { TextField, Typography, Box, Button } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { addTask, fetchLists } from '../slices/listsSlice';
import { useHistory } from 'react-router-dom';

const CreateNewTask = () => {
  const history = useHistory();
  let { url } = useRouteMatch();
  const [id] = url.match(/(?<=project\/)([\S]+?)(?=\/)/);
  const dispatch = useDispatch();
  const [activeList] = useSelector((state) => {
    return state.lists.lists.filter((elem) => {
      return elem.id === Number(id);
    });
  });
  let title, description;
  const handleChandeTitle = (event) => {
    title = event.target.value;
  };
  const handleChandeDescription = (event) => {
    description = event.target.value;
  };
  const handleClose = () => {
    history.push(`${url.replace('/create-new-task', '')}`);
  };
  const handleSaveClick = () => {
    dispatch(addTask({ title, description, listId: Number(id) }));
    handleClose();
  };
  return (
    <React.Fragment>
      <Typography variant="h4" align="center" gutterBottom>
        Create new task in {activeList && activeList.name} project
      </Typography>
      <TextField
        id="task-title"
        label="Task title"
        style={{ marginBottom: 40, marginTop: 40 }}
        required
        fullWidth
        margin="normal"
        variant="outlined"
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
        onChange={handleChandeDescription}
      />
      <Box align="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          size="large"
          style={{ marginRight: 8 }}
          onClick={handleSaveClick}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CancelIcon />}
          size="large"
          style={{ margin: 8 }}
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default CreateNewTask;
