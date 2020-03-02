import React, { useEffect, useState } from 'react';
import { TableCreater } from './components/TableCreater/TableCreater';
import { SetDifficulty } from './components/SetDifficulty/SetDifficulty';
import { TableOfWinner } from './components/TableOfWinner/TableOfWinner';
import './App.css';
import axios from 'axios';

function App() {
  const url = 'https://starnavi-frontend-test-task.herokuapp.com/';
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [lvlMode, setLvlmode] = useState(false);
  const [howNamyPlays, setHowNamyPlays] = useState(0);
  const [name, setName] = useState('');
  const [triggerHndlerUpdate, setTriggerHndlerUpdate] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getSettings() {
      const response = await axios.get(`${url}game-settings`);
      setSettings(response.data);
      setLoading(false);
    }
    getSettings();
  }, []);
  const selectedHandler = value => {
    setLvlmode(settings[value]);
    setIsStart(isStart && !isStart);
  };
  const nameHandler = val => {
    setName(val);
  };
  const falselvlModeTriger = prev => {
    const changeObj = { ...prev, ...{ relod: true } };
    const prevObj = { ...prev };
    setLvlmode(changeObj);
    setLvlmode(prevObj);
  };
  const numberOfPlayHandler = () => {
    setHowNamyPlays(prev => prev + 1);
    setIsStart(true);
    setIsGameInProgress(prev => !prev);
    falselvlModeTriger(lvlMode);
  };
  const gameInProgressHandler = () => {
    setIsGameInProgress(false);
  };
  const postRequest = (winner, date) => {
    const data = JSON.stringify({
      winner,
      date,
    });
    async function postWinners() {
      const response = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        url: `${url}winners`,
        data,
      });
      setTriggerHndlerUpdate(prev => !prev);
    }
    postWinners();
  };
  let count = 1;
  const requestHandle = (winner, date) => {
    if (count % 2 === 0) {
      postRequest(winner, date);
    }
    count += 1;
  };
  return (
    <>
      <h1 className="pr"> Pretty Game</h1>
      <div className="container">
        <div className="leftSide">
          <SetDifficulty
            settings={settings}
            loading={loading}
            selectedHandler={selectedHandler}
            nameHandler={nameHandler}
            numberOfPlayHandler={numberOfPlayHandler}
            howNamyPlays={howNamyPlays}
            isGameInProgress={isGameInProgress}
          />

          {!loading && lvlMode && isStart && (
            <TableCreater
              lvlMode={lvlMode}
              gameInProgressHandler={gameInProgressHandler}
              isGameInProgress={isGameInProgress}
              name={name}
              requestHandle={requestHandle}
            />
          )}
        </div>
        <div className="rightSide">
          <TableOfWinner triggerHndlerUpdate={triggerHndlerUpdate} />
        </div>
      </div>
    </>
  );
}

export default App;
