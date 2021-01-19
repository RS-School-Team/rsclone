import { Container, Grid } from '@material-ui/core';
import React from 'react';
import MainContent from './components/MainContent.jsx';
import SideBar from './components/SideBar.jsx';

function App() {
  return (
    <Container maxWidth="xl" className="todo">
      <h1>App</h1>
      <Grid container spacing={2}>
        <SideBar />
        <MainContent />
      </Grid>
    </Container>
  );
}

export default App;
