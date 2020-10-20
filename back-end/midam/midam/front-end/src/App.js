import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Login from './Components/Shared/Login';
import PageRouter from './Components/Shared/PageRouter';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PageRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
