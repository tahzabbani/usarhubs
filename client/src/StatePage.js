// StatePage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
          <h2>{stateData.state}</h2>
          <div className="hubs">
            {stateData.hubs.map((hub, index) => (
              <div key={index} className="hub-block">
                <h3>{hub.city}</h3>
                <p>Zip Code: {hub.zipCode}</p>
                <p>Social Media: {hub.socialMedia}</p>
                <p>Join Link: <a href={hub.joinLink}>{hub.joinLink}</a></p>
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
