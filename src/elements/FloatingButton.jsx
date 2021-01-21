import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(10),
    right: theme.spacing(5),
  },
}));
const FloatingButton = () => {
  const classes = useStyles();
  return (
    <Fab color="primary" aria-label="add" className={classes.root}>
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;
