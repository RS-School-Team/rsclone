import React, { useEffect } from 'react';
import { fetchTeachers, createOrder } from '../slices/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

const TeachersList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.app.token);
  const teachers = useSelector((state) => state.orders.teachers);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTeachers(token));
  }, []);

  return (
    <React.Fragment>
      <List>
        {teachers.map(({ _id, name }) => (
          <ListItem key={_id}>
            <ListItemText>{`${name.firstName} ${name.lastName}`}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="add"
                color={'primary'}
                onClick={() => {
                  console.log(_id, token);
                  dispatch(createOrder([_id, token]));
                }}
              >
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default TeachersList;
