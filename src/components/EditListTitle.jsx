import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editList, editListClose } from '../slices/listsSlice';

const EditListTitle = () => {
  const isOpen = useSelector((state) => state.lists.isEditListOpen);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const editingList = useSelector((state) => state.lists.editingList);
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const onSaveListClicked = () => {
    if (title.trim()) {
      dispatch(editList({ title: title.trim(), id: editingList.id }));
      dispatch(editListClose());
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(editListClose())}
      aria-labelledby="form-dialog-title"
      fullWidth
      align="center"
    >
      <DialogTitle id="form-dialog-title">Edit list title</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={`Previous list name: ${editingList.name}`}
          type="text"
          fullWidth
          onChange={handleChange}
          placeholder={editingList.name}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onSaveListClicked}>
          Save
        </Button>
        <Button color="secondary" onClick={() => dispatch(editListClose())}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditListTitle;
