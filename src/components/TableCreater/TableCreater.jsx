import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import './TableCreater.css';

export const TableCreater = ({ lvlMode, gameInProgressHandler, name, requestHandle }) => {
  let { field, delay } = lvlMode;
  const idInterval = useRef(null);
  const squares = field * field;
  const sizeSquaresInPx = 35;
  const winnerQuantityOfFiled = Math.ceil(squares / 2);
  let numberOfRows = [];
  numberOfRows.length = squares;
  numberOfRows.fill({});
  const [numberOfRow, setNumberOfRow] = useState(numberOfRows);
  let winnerIs = '';
  const inputChangeHandle = e => {
    const { id } = e.target;
    setNumberOfRow(prev => {
      return prev.map((item, index) => {
        if (+id === +index) {
          return {
            ...item,
            winner: true,
          };
        }
        return {
          ...item,
        };
      });
    });
  };
  function randomNumber(max, without) {
    let random = Math.floor(Math.random() * Math.floor(max));
    for (let i = 0; i < without.length; i++) {
      if (random === without[i]) {
        return randomNumber(max, without);
      }
    }
    return random;
  }
  function getDate() {
    const Datee = new Date();
    const dateArray = Datee.toString().split(' ');
    const dateNowString = `${dateArray[4].slice(0, 5)}; ${dateArray[2]} ${dateArray[1]} ${
      dateArray[3]
    }`;
    return dateNowString;
  }
  // Counter of winner
  let countAi = 0;
  let countPlayer = 0;
  numberOfRow.forEach(item => {
    if (item.winner) {
      countPlayer = countPlayer + 1;
    } else if (item.winner === false) {
      countAi = countAi + 1;
    }
  });

  if (countPlayer >= winnerQuantityOfFiled) {
    clearInterval(idInterval.current);
    gameInProgressHandler();
    winnerIs = name;
    const date = getDate();
    requestHandle(winnerIs, date);
  } else if (countAi >= winnerQuantityOfFiled) {
    clearInterval(idInterval.current);
    gameInProgressHandler();
    winnerIs = 'Computer AI';
    const date = getDate();
    requestHandle(winnerIs, date);
  }
  //// Counter of winner END
  const fieldFill = [];
  const timer = squares => {
    const randomItem = randomNumber(squares, fieldFill);
    setNumberOfRow(prev => {
      return prev.map((item, index) => {
        if (index === randomItem) {
          return {
            ...item,
            active: true,
          };
        } else {
          return {
            ...item,
          };
        }
      });
    });
    fieldFill.push(randomItem);
    async function timerOn() {
      let promise = new Promise(resolve => {
        setTimeout(() => resolve('готово!'), delay);
      });
      let result = await promise;
      if (result) {
        setNumberOfRow(prev => {
          return prev.map((item, index) => {
            if (index === randomItem && item.winner) {
              return {
                ...item,
                active: false,
              };
            } else if (index === randomItem) {
              return {
                ...item,
                active: false,
                winner: false,
              };
            } else {
              return { ...item };
            }
          });
        });
      }
    }
    timerOn();
  };
  useEffect(() => {
    idInterval.current = setInterval(() => {
      timer(squares);
    }, delay);
    setNumberOfRow(numberOfRows);

    return () => {
      clearInterval(idInterval.current);
      setNumberOfRow(numberOfRows);
    };
  }, [lvlMode]);
  return (
    <>
      {winnerIs ? <p className="winner">Winner is {winnerIs}</p> : <p className="winner"></p>}
      <div
        style={{
          width: `${field * sizeSquaresInPx}px`,
          height: `${field * sizeSquaresInPx}px`,
          display: 'flex',
          flexWrap: 'wrap',
          margin: '10px auto',
        }}
      >
        {numberOfRow.map((item, indexRow) => {
          return (
            <div
              key={Date.now() * indexRow}
              className="square"
              style={{
                boxSizing: `border-box`,
                width: `${sizeSquaresInPx}px`,
                height: `${sizeSquaresInPx}px`,
                border: `1px solid gray`,
              }}
            >
              <label
                htmlFor={indexRow}
                style={{
                  width: `100%`,
                  height: `100%`,
                  display: 'block',
                  background: `${
                    numberOfRow[indexRow].winner
                      ? 'green'
                      : numberOfRow[indexRow].winner === false
                      ? 'red'
                      : numberOfRow[indexRow].active
                      ? 'blue'
                      : 'none'
                  }`,
                }}
              >
                <input
                  id={indexRow}
                  type="checkbox"
                  disabled={numberOfRow[indexRow].active ? false : true}
                  onChange={inputChangeHandle}
                />
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};
