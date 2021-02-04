import {Button, TextField, Typography} from '@material-ui/core';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from 'react-router';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {addTask} from '../slices/listsSlice';
import {useHistory} from 'react-router-dom';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleChandeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChandeDescription = (event) => {
    setDescription(event.target.value);
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
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        size="large"
        style={{ marginRight: 8 }}
        onClick={handleSaveClick}
        disabled={
          title.trim().length < 4
            ? title.trim().length < 4
            : description.trim().length < 70
        }
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
      <Typography variant="h4" align="center" gutterBottom>
        Create new task in {activeList && activeList.name} project
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          helperText="Title length must be more than 3 characters"
          error={title.trim().length < 4}
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
          helperText="Description length must be more than 70 characters"
          error={description.trim().length < 70}
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
      </form>
    </React.Fragment>
  );
};

export default CreateNewTask;
