import { Container, Divider, Grid } from '@material-ui/core';
import React from 'react';
import MainContent from './components/MainContent.jsx';
import SideBar from './components/SideBar.jsx';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Container maxWidth="xl" className="todo" style={{ height: '100vh' }}>
        <Header />
        <Grid container style={{ height: '90vh' }}>
          <Grid item xs={12} sm={3}>
            <SideBar />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={8}>
            <MainContent />
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
