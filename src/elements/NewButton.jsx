import React from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';

export default function NewButton({ title, color, onClick }) {
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color={color}
        className={classes.margin}
        onClick={() => onClick()}
      >
        {title}
      </Button>
    </ThemeProvider>
  );
}
