import { Container } from '@material-ui/core';
import React from 'react';
import MainContent from './components/MainContent.jsx';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Container maxWidth="xl" className="todo" style={{ height: '100vh' }}>
        <Header />
        <Sidebar />
        <MainContent />
      </Container>
    </Router>
  );
}

export default App;
