import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import './TableCreater.css';

export const TableCreater = ({ lvlMode }) => {
  let { field, delay } = lvlMode;
  const [fieldFill, setFieldFill] = useState([]);
  const idInterval = useRef(null);
  const squares = field * field;
  const winnerQuantityOfFiled = Math.ceil(squares / 2);
  let numberOfRows = [];
  numberOfRows.length = squares;
  numberOfRows.fill({});
  const [numberOfRow, setNumberOfRow] = useState(numberOfRows);
  console.log('numberOfRows', numberOfRow.length);
  const inputChangeHandle = e => {
    const { id } = e.target;
    setNumberOfRow(prev => {
      return prev.map((item, index) => {
        if (id == index) {
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
    console.log('afte Click:', numberOfRow);
  };
  function randomNumber(max, without) {
    let random = Math.floor(Math.random() * Math.floor(max));
    for (let i = 0; i < without.length; i++) {
      console.log(random === without[i]);
      if (random === without[i]) {
        return randomNumber(max, without);
      }
    }
    return random;
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
  if (countAi === winnerQuantityOfFiled || countPlayer === winnerQuantityOfFiled) {
    clearInterval(idInterval.current);
  }
  console.log('AI', countAi);
  console.log('PLAYER', countPlayer);
  //// Counter of winner END
  const timer = squares => {
    console.log('squares Inside before:', squares);
    const randomItem = randomNumber(squares, fieldFill);
    setNumberOfRow(prev => {
      console.log(prev);
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
    setFieldFill(prev => prev.push(randomItem));
    async function timerOn() {
      let promise = new Promise(resolve => {
        setTimeout(() => resolve('готово!'), delay - 100);
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
    setFieldFill([]);
    return () => {
      clearInterval(idInterval.current);
      setNumberOfRow(numberOfRows);
      setFieldFill([]);
    };
  }, [lvlMode]);
  return (
    <div
      style={{
        width: `${field * 50}px`,
        height: `${field * 50}px`,
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {numberOfRow.map((item, indexRow) => {
        return (
          <div
            key={Date.now() * indexRow}
            className="square"
            style={{
              boxSizing: `border-box`,
              width: '50px',
              height: '50px',
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
  );
};
