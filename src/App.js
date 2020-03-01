import React, { useEffect, useState } from 'react';
import { TableCreater } from './components/TableCreater';
import { SetDifficulty } from './components/SetDifficulty';

import axios from 'axios';

function App() {
  const url = 'https://starnavi-frontend-test-task.herokuapp.com/';
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [lvlMode, setLvlmode] = useState(false);
  const [howNamyPlays, setHowNamyPlays] = useState(0);
  const [name, setName] = useState('');
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
  };
  const nameHandler = val => {
    setName(val);
  };
  const numberOfPlayHandler = () => {
    setHowNamyPlays(prev => prev + 1);
  };
  return (
    <>
      <p>{name}</p>
      <SetDifficulty
        settings={settings}
        loading={loading}
        selectedHandler={selectedHandler}
        nameHandler={nameHandler}
        numberOfPlayHandler={numberOfPlayHandler}
        howNamyPlays={howNamyPlays}
      />

      {!loading && lvlMode && <TableCreater lvlMode={lvlMode} />}
    </>
  );
}

export default App;
