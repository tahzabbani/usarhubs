import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StateBlocks from './StateBlocks';
import StatePage from './StatePage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={ <StateBlocks/> } />
          <Route path="/state/:stateName" element={ <StatePage/> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

