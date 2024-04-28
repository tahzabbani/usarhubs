import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

function StateBlocks() {
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api');
      setStateData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
        <div className="header">
            <h1>ROUNDNET HUBS</h1>
            <h2 class='beta'>BETA</h2>
        </div>
        <div class='entry-form'>
          <p>Enter your own hub's location <a href='https://docs.google.com/forms/d/e/1FAIpQLSfwvPLKPfuLD01Ud3rNpbAp5zf8wT-njYVo2zGMXWhC-pndRg/viewform'>here</a></p>
        </div>
        <div className="state-blocks-container">
        {stateData.map((state, index) => (
            <Link key={index} to={`/state/${state.state}`} className="state-block">
            <div>
            <h2>{state.state}</h2>
            </div>
        </Link>
        ))}
        </div>
    </div>
  );
}

export default StateBlocks;
