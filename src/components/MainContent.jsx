import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Box, List, ListItem } from '@material-ui/core';

const MainContent = () => {
  const activeList = useSelector((state) => state.tasks.activeList);
  useEffect(() => {
    console.log(activeList.tasks);
  });
  return (
    <Box p={2}>
      <Typography variant="h4" align="center" gutterBottom>
        {activeList && activeList.name}
      </Typography>
      <List>
        {activeList &&
          activeList.tasks &&
          activeList.tasks.map((task) => {
            console.log(task);
            return (
              <ListItem button style={{ height: 50 }}>
                {task.text}
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default MainContent;
