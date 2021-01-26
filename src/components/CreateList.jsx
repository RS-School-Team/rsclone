import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addList, createListClose } from '../slices/listsSlice';

const CreateList = () => {
  const isOpen = useSelector((state) => state.lists.isCreateListOpen);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const onSaveListClicked = () => {
    if (title.trim()) {
      setTitle('');
      dispatch(addList(title.trim()));
      dispatch(createListClose());
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(createListClose())}
      aria-labelledby="form-dialog-title"
      fullWidth
      align="center"
    >
      <DialogTitle id="form-dialog-title">Create new project</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter project title</DialogContentText>
        <form noValidate autoComplete="off">
          <TextField
            error={title.trim().length < 4}
            helperText="Title length must be more than 3 characters"
            autoFocus
            margin="dense"
            id="name"
            label="Project title"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onSaveListClicked}
          disabled={title.trim().length < 4}
        >
          Save
        </Button>
        <Button color="secondary" onClick={() => dispatch(createListClose())}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateList;
