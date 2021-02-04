import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,} from '@material-ui/core';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editList, editListClose} from '../slices/listsSlice';

const EditListTitle = () => {
  const isOpen = useSelector((state) => state.lists.isEditListOpen);
  const dispatch = useDispatch();
  let [title, setTitle] = useState('');
  const editingList = useSelector((state) => state.lists.editingList);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const onSaveListClicked = () => {
    if (title.trim()) {
      setTitle('');
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
      <DialogTitle id="form-dialog-title">Edit project title</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            error={title.trim().length < 4}
            helperText="Title length must be more than 3 characters"
            autoFocus
            margin="dense"
            id="name"
            label={`New project's title`}
            type="text"
            fullWidth
            onChange={handleChange}
            placeholder={editingList.name}
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
        <Button color="secondary" onClick={() => dispatch(editListClose())}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditListTitle;
