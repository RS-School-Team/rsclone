import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../actions/listsActions';
import { Grid } from '@material-ui/core';

const SideBar = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getLists());
  }, []);

  return (
    <Grid item xl={12}>
      {lists.length && (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>{list.name}</li>
          ))}
        </ul>
      )}
    </Grid>
  );
};

export default SideBar;
