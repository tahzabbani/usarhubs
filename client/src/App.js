import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function SpreadsheetData() {
  const [data, setData] = useState({ columns: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h2>Roundnet Hubs</h2>
      <table>
        <thead>
          <tr>
            {data.columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.map((row, index) => (
            <tr key={index}>
              {data.columns.map(column => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SpreadsheetData;


