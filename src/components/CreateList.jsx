import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addList, closeCreateList } from '../actions/listsActions';
const CreateList = () => {
  const isOpen = useSelector((state) => state.lists.isCreateListOpen);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const onSaveListClicked = () => {
    if (title.trim()) {
      dispatch(addList(title.trim()));
      dispatch(closeCreateList());
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(closeCreateList())}
      aria-labelledby="form-dialog-title"
      fullWidth
      align="center"
    >
      <DialogTitle id="form-dialog-title">Create new tasks list</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter list title</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Task title"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onSaveListClicked}>
          Save
        </Button>
        <Button color="secondary" onClick={() => dispatch(closeCreateList())}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateList;
