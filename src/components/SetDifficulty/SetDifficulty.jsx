import React, { useState } from 'react';

export const SetDifficulty = ({
  settings,
  selectedHandler,
  nameHandler,
  numberOfPlayHandler,
  howNamyPlays,
  isGameInProgress,
}) => {
  let selectArray = [];
  for (let key in settings) {
    selectArray.push({ mode: key, field: settings[key].field, delay: settings[key].delay });
  }
  const [selectedMode, setSelectedMode] = useState({ value: '' });
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const selectedModeHandle = e => {
    if (e.target.value) {
      setSelectedMode({ value: e.target.value });
      selectedHandler(e.target.value);
    }
  };
  const nameHandle = e => {
    const { value } = e.target;
    setUserName(value);
    nameHandler(value);
  };
  const playHandler = () => {
    if (selectedMode.value && userName) {
      numberOfPlayHandler();
      setErrorMessage('');
    } else if (!selectedMode.value) {
      setErrorMessage(<p>Please, pick game mode</p>);
    } else if (!userName) {
      setErrorMessage(<p>Please, enter your name</p>);
    }
  };
  return (
    <>
      <select value={selectedMode.value} onChange={selectedModeHandle} disabled={isGameInProgress}>
        <option>Pick game mode</option>
        {selectArray.map(item => (
          <option value={item.mode} key={item.mode}>
            {item.mode}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={userName}
        onChange={nameHandle}
        placeholder="Enter your name"
        disabled={isGameInProgress}
      />
      <button onClick={playHandler} disabled={isGameInProgress}>
        {howNamyPlays > 0 ? 'PLAY AGAIN' : 'PLAY'}
      </button>
      {errorMessage}
    </>
  );
};
