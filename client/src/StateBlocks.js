import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';


const stateToImageMap = {
  "Arizona": "Arizona_Tempe.jpeg",
  "California": "California_Sacramento.jpeg", // Chose Sacramento for California
  "DMV Area": "DMV_GWR.jpg",
  "Georgia": "Georgia_Athens.jpeg",
  "Illinois": "Illinois.jpeg", // General Illinois image for duplicates
  "Indiana": "Indiana_WestLafayette.jpeg",
  "Massachusetts": "Massachusetts_Boston.png", // Chose Boston for Massachusetts
  "Michigan": "Michigan_Lansing.webp", // Chose Lansing for Michigan
  "Montana": "Montana_Bozeman.jpeg",
  "New York": "NewYork_NewYorkCity.jpg", // Chose New York City for New York
  "North Carolina": "NorthCarolina_Wilmington.jpg",
  "Ohio": "Ohio_Columbus.png", // Chose Columbus for Ohio
  "Pennsylvania": null, // No image provided for Pennsylvania
  "South Carolina": "SouthCarolina_Columbia.jpg",
  "Tennessee": "Tennessee_Nashville.jpg",
  "Texas": "Texas.png",
  "Utah": "Utah.webp", // General Utah image for all Utah entries
  "Virginia": null, // No image provided for Virginia
  "Washington": "Washington_Seattle.jpeg"
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
    <div>
        <div className="header">
            <h1>ROUNDNET HUBS</h1>
            <h2 className='beta'>BETA</h2>
        </div>
        <div className='entry-form'>
          <p>Enter your own hub's location <a href='https://docs.google.com/forms/d/e/1FAIpQLSfwvPLKPfuLD01Ud3rNpbAp5zf8wT-njYVo2zGMXWhC-pndRg/viewform'>here</a></p>
        </div>
        <div className="state-blocks-container">
        {stateData.map((state, index) => (
            <Link key={index} to={`/state/${state.state}`} className="state-block">
            <div>
              {stateToImageMap[state.state] && (
                <img 
                  src={`/UsarHubLogos/${stateToImageMap[state.state]}`} 
                  alt={`${state.state} logo`} 
                  className="state-image"
                />
              )}
            <h2>{state.state}</h2>
            </div>
        </Link>
        ))}
        </div>
    </div>
  );
}

export default StateBlocks;
