import { Container } from '@material-ui/core';
import React from 'react';
import MainContent from './components/MainContent/MainContent.jsx';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="xl" className="todo" style={{ height: '100vh' }}>
          <MainContent />

          <Header />
          <Sidebar />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
