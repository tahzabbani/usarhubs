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
