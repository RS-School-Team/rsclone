import {Button, Dialog, DialogActions, DialogContent, DialogTitle,} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, deleteTaskClose} from '../slices/listsSlice';
import {useHistory} from 'react-router-dom';

const DeleteTaskDialog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.lists.isDeleteTaskOpen);
  const { id, title, listId } = useSelector(
    (state) => state.lists.deletingTask
  );
  const handleDelete = () => {
    dispatch(deleteTask({ id, listId }));
    dispatch(deleteTaskClose());
    history.goBack();
  };
  return (
    <Dialog
      open={isOpen}
      area-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      onClose={() => dispatch(deleteTaskClose())}
    >
      <DialogTitle id="alert-dialog-title">{`Delete task ${title}?`}</DialogTitle>
      <DialogContent id="alert-dialog-content">
        You will not be able to use this task anymore
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => handleDelete()}>
          Delete
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => dispatch(deleteTaskClose())}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
