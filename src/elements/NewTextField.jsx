import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const NewTextField = ({
  task,
  width,
  label,
  rows,
  onChangeTitle,
  onChangeDescription,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: width,
      },
    },
  }));
  const [value, setValue] = React.useState(task.text);
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
    onChangeTitle ? onChangeTitle(value) : onChangeDescription(value);
  };

  return (
    <div>
      <TextField
        className={classes.root}
        id="outlined-multiline-flexible"
        label={label}
        multiline
        rows={rows}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    </div>
  );
};

export default NewTextField;
