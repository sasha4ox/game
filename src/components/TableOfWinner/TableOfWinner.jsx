import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableOfWinner.css';

export const TableOfWinner = ({ triggerHndlerUpdate }) => {
  const url = 'https://starnavi-frontend-test-task.herokuapp.com/';
  const [winnerTable, setWinnerTable] = useState([]);
  useEffect(() => {
    async function getSettings() {
      const response = await axios.get(`${url}winners`);
      setWinnerTable(response.data);
      // setLoading(false);
    }
    getSettings();
  }, [triggerHndlerUpdate]);
  const lastWinnersArray = winnerTable.slice(-5);
  return (
    <div className="leader">
      <h1>Leader Board</h1>
      {lastWinnersArray.reverse().map(item => (
        <div key={item.id} className="WinnerBoard">
          <span>{item.winner}</span>
          <span>
            {item.date
              .split(';')
              .reverse()
              .join(' ')}
          </span>
        </div>
      ))}
    </div>
  );
};
