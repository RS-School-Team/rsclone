import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { Button, DialogActions } from '@material-ui/core';
import { closeLogin } from '../slices/headerSlice';
import SignUpForm from "./SignUpForm";

const LoginModal = () => {
  const isOpen = useSelector((state) => state.header.isOpen);
  const dispatch = useDispatch();

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <SignUpForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeLogin())} color="primary">
          Sign In
        </Button>
        <Button onClick={() => dispatch(closeLogin())} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
