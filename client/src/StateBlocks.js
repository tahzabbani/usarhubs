import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';


const stateToImageMap = {
  "Arizona": "Arizona_Tempe.jpeg",
  "California": "California.png", // Chose Sacramento for California
  "Washington DC": "DMV_GWR.jpg",
  "Georgia": "Georgia_Athens.jpeg",
  "Illinois": "Illinois.jpeg", // General Illinois image for duplicates
  "Indiana": "Indiana_WestLafayette.jpeg",
  "Massachusetts": "Massachusetts_Boston.png", // Chose Boston for Massachusetts
  "Michigan": "Michigan_Lansing.webp", // Chose Lansing for Michigan
  "Montana": "Montana_Bozeman.jpeg",
  "New York": "NewYork_NewYorkCity.jpg", // Chose New York City for New York
  "North Carolina": "NorthCarolina_Wilmington.jpg",
  "Ohio": "Ohio_Columbus.png", // Chose Columbus for Ohio
  "Pennsylvania": "usaroundnet.png", // No image provided for Pennsylvania
  "South Carolina": "SouthCarolina_Columbia.jpg",
  "Tennessee": "Tennessee_Nashville.jpg",
  "Texas": "Texas.png",
  "Utah": "Utah.webp", // General Utah image for all Utah entries
  "Virginia": "usaroundnet.png", // No image provided for Virginia
  "Washington": "Washington_Seattle.jpeg",
  "default": "usaroundnet.png"
};

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
    <div className="app-container">
      <div className="header">
        <h1 className="title">ROUNDNET HUBS</h1>
        <h2 className='beta'>BETA</h2>
      </div>
      <div className='entry-form'>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSfwvPLKPfuLD01Ud3rNpbAp5zf8wT-njYVo2zGMXWhC-pndRg/viewform' target='_blank' className="entry-button">Enter your own hub's location</a>
      </div>
      <div className="state-blocks-container">
        {stateData.map((state, index) => (
          <Link key={index} to={`/state/${state.state}`} className="state-block">
            <div>
              <h2>{state.state}</h2>
              <img 
                src={`/UsarHubLogos/${stateToImageMap[state.state] || stateToImageMap['default']}`} 
                alt={`${state.state} logo`} 
                className="state-image"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default StateBlocks;
