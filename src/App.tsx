import React from 'react';
import logo from './logo.svg';
import './App.css';
import Just from "./Just";
import JustWithStore from "./redux/JustWithStore";

const aba = 'try aba'
const count: number = 0;

function App() {



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Just test={aba} />
          <JustWithStore />
          {count} TS
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
