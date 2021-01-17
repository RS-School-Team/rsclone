import React, { useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';

import NewTextField from '../../elements/NewTextField';
import NewButton from '../../elements/NewButton';

const CreateTask = ({ task, onEditTask, onCancel }) => {
  console.log('editing');
  const [newTitle, setNewTitle] = useState(task.text);
  const [newDescription, setNewDescription] = useState(task.description);
  const onChangeTitle = (title) => {
    setNewTitle(title);
    console.log(newTitle);
  };
  const onChangeDescription = (description) => {
    setNewDescription(description);
    console.log(newDescription);
  };
  const handleClick = () => {
    onEditTask(task.listId, {
      text: newTitle,
      description: newDescription,
      id: task.id,
    });
  };
  const history = useHistory();
  return (
    <form className="form" noValidate autoComplete="off">
      <div>
        {task && (
          <NewTextField
            onChangeTitle={onChangeTitle}
            task={task}
            width="100ch"
            label={task.text}
            rows="1"
          />
        )}

        {task && (
          <NewTextField
            task={task}
            width="100ch"
            label="Task description"
            rows="8"
            onChangeDescription={onChangeDescription}
          />
        )}
      </div>
      <NewButton title="Save" color="primary" onClick={handleClick} />
      <NewButton
        title="Cancel"
        onClick={() => {
          console.log('cancelled');
          history.goBack();
          history.goBack();

          onCancel();
        }}
      />
    </form>
  );
};

export default CreateTask;
