import React, { useState } from 'react';

export const SetDifficulty = ({
  settings,
  selectedHandler,
  nameHandler,
  numberOfPlayHandler,
  howNamyPlays,
}) => {
  let selectArray = [];
  for (let key in settings) {
    selectArray.push({ mode: key, field: settings[key].field, delay: settings[key].delay });
  }
  const [selectedMode, setSelectedMode] = useState({ value: '' });
  const [userName, setUserName] = useState('');
  const selectedModeHandle = e => {
    setSelectedMode({ value: e.target.value });
    selectedHandler(e.target.value);
  };
  const nameHandle = e => {
    const { value } = e.target;
    setUserName(value);
    nameHandler(value);
  };
  const playHandler = () => {
    numberOfPlayHandler();
  };
  return (
    <>
      <select value={selectedMode.value} onChange={selectedModeHandle}>
        <option>Make your choice</option>
        {selectArray.map(item => (
          <option value={item.mode}>{item.mode}</option>
        ))}
      </select>
      <input type="text" value={userName} onChange={nameHandle} placeholder="Enter your name" />
      <button onClick={playHandler}>{howNamyPlays > 0 ? 'PLAY AGAIN' : 'PLAY'}</button>
    </>
  );
};
