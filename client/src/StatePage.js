// StatePage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const cityToImageMap = {
  "Tempe/Phoenix": "Arizona_Tempe.jpeg",
  "Sacramento": "California_Sacramento.jpeg",
  "Washington DC / Baltimore": "DMV_GWR.jpg",
  "Athens": "Georgia_Athens.jpeg",
  "Arlington Heights": "Illinois.jpeg",
  "Chicago": "Illinois.jpeg",
  "Naperville": "Illinois.jpeg",
  "Champaign": "Illinois_Champaign.avif",
  "Normal": "Illinois_Normal.jpeg",
  "Wheaton": "Illinois.jpeg",
  "Edwardsville": "Illinois_Edwardsville.jpg",
  "West Lafayette": "Indiana_WestLafayette.jpeg",
  "Boston": "Massachusetts_Boston.png",
  "Medford/Somerville": "Massachusetts_Boston.png",
  "Hillsdale": "Michigan_Hillsdale.jpg",
  "East Lansing": "Michigan_Lansing.webp",
  "Bozeman": "Montana_Bozeman.jpeg",
  "New York City": "NewYork_NewYorkCity.jpg",
  "Wilmington": "NorthCarolina_Wilmington.jpg",
  "Albany": "NewYork_Albany.jpg",
  "Loudonvillie": "NewYork_Loudonvillie.jpg",
  "Cleveland": "Ohio_Cleveland.jpg",
  "Columbus": "Ohio_Columbus.png",
  "Bowling Green": "Ohio_BowlingGreen.jpeg",
  "Lima": "usaroundnet.png",
  "Pittsburgh": "usaroundnet.png",
  "Scranton": "usaroundnet.png",
  "Columbia": "SouthCarolina_Columbia.jpg",
  "Nashville": "Tennessee_Nashville.jpg",
  "Houston": "Texas.png",
  "Utah Roundnet Association": "Utah.webp",
  "Alpine": "Utah.webp",
  "Cache Valley": "Utah.webp",
  "Dixie / Cedar": "Utah.webp",
  "Jordan River": "Utah.webp",
  "Nebo": "Utah.webp",
  "Orem": "Utah.webp",
  "Provo": "Utah.webp",
  "Sugarhouse": "Utah.webp",
  "Utah State University": "Utah.webp",
  "Utah Valley University": "Utah.webp",
  "University of Utah": "Utah.webp",
  "BYU": "Utah.webp",
  "Utah Tech University": "Utah.webp",
  "Southern Utah University": "Utah.webp",
  "Richmond": "usaroundnet.png",
  "Seattle": "Washington_Seattle.jpeg"
};

function getLinkTextAndUrl(link) {
  if (!link) return { text: '', url: null };

  let text = link;
  if (link.includes('groupme')) {
    text = 'GroupMe';
  } else if (link.includes('slack')) {
    text = 'Slack';
  } else if (link.includes('discord')) {
    text = 'Discord';
  }

  // Check if it's a valid URL
  try {
    new URL(link);
    return { text, url: link };
  } catch {
    return { text: link, url: null };
  }
}

function StatePage() {
  const { stateName } = useParams();
  const [stateData, setStateData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api');
      const foundState = result.data.find(state => state.state === stateName);
      setStateData(foundState);
    };
    fetchData();
  }, [stateName]);

  return (
    <div className="state-page">
      <div className="back-link-container"> {/* Container for positioning */}
        <Link to="/" className="back-link">Back to States</Link> {/* Back link */}
      </div>
      {stateData ? (
        <>
          <h2 className="state-title">{stateData.state}</h2>
          <div className="hubs">
            {stateData.hubs.map((hub, index) => (
              <div key={index} className="hub-block">
                <h3 className='city-header'>{hub.city}</h3>
                {cityToImageMap[hub.city] && (
                  <img 
                    src={`/UsarHubLogos/${cityToImageMap[hub.city]}`} 
                    alt={`${hub.city} logo`} 
                    className="state-image"
                  />
                )}
                <p>Zip Code: {hub.zipCode}</p>
                <p>Social Media: {hub.socialMedia}</p>
                {hub.joinLink ? (
                  <p>Join Link: {
                    getLinkTextAndUrl(hub.joinLink).url ? (
                      <a href={getLinkTextAndUrl(hub.joinLink).url}>
                        {getLinkTextAndUrl(hub.joinLink).text}
                      </a>
                    ) : (
                      getLinkTextAndUrl(hub.joinLink).text
                    )
                  }</p>
                ) : (
                  <p>Join Link: None</p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StatePage;
