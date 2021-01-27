import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Button, DialogActions} from '@material-ui/core';
import {closeLogin} from '../slices/headerSlice';
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
