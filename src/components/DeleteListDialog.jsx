import {Button, Dialog, DialogActions, DialogContent, DialogTitle,} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteList, deleteListClose} from '../slices/listsSlice';

const DeleteListDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.lists.isDeleteListOpen);
  const lists = useSelector((state) => state.lists.lists);
  const { id, name } = useSelector((state) => state.lists.deletingList);
  const handleDelete = (id, lists) => {
    dispatch(deleteListClose());
    dispatch(deleteList(id, lists));
  };
  return (
    <Dialog
      open={isOpen}
      area-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      onClose={() => dispatch(deleteListClose())}
    >
      <DialogTitle id="alert-dialog-title">{`Delete list ${name}?`}</DialogTitle>
      <DialogContent id="alert-dialog-content">
        You will not be able to use this list anymore
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => handleDelete(id, lists)}>
          Delete
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={() => dispatch(deleteListClose())}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteListDialog;
