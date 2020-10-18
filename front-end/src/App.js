import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Login from './Pages/Login';
import PageRouter from './Components/PageRouter';

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
