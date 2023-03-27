import React, { useEffect, useState } from 'react';
import './Todo.css';

export default function Todo() {
  const [arr, setArr] = useState([]);

  const handleClick = (e) => {
    const id = e.target.parentNode.getAttribute('data-id');

    const newArr = arr.filter((item) => +item.id !== +id);

    setArr(newArr);
  };

  const handleCheck = (e) => {
    const id = e.target.closest('li').getAttribute('data-id');

    const newArr = [...arr];

    newArr.forEach((item) => {
      if (+item.id === +id) {
        item.completed = !item.completed; // eslint-disable-line no-param-reassign
      }
    });

    setArr(newArr);
  };

  const handleChange = (e) => {
    const id = e.target.closest('li').getAttribute('data-id');
    const { value } = e.target;

    const newArr = [...arr];

    newArr.forEach((item) => {
      if (+item.id === +id) item.todo = value; // eslint-disable-line no-param-reassign
    });

    setArr(newArr);
  };

  useEffect(() => {
    document.querySelector('.todo-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const newObj = {
          id: Math.floor(Math.random() * 11000),
          todo: document.querySelector('.todo-input').value,
          completed: false,
        };

        const newArr = [...arr, newObj];
        setArr(newArr);
      }
    });
  }, [arr, setArr]);

  return (
    <div className="todo-list">
      <input className="todo-input" placeholder="Todo item" />
      <ul className="todo-data">
        {
          arr.map((item) => (
            <li data-id={item.id} key={item.id.toString()} className="todo-data-li">
              <span className="todo-data-item-wrapper">
                <input className="todo-data-check" type="checkbox" checked={item.completed} onClick={handleCheck} />
                <input
                  value={item.todo}
                  onChange={handleChange}
                  className={
                      item.completed
                        ? 'todo-data-item strike'
                        : 'todo-data-item'
                    }
                />
              </span>

              <span className="x" onClick={handleClick}>{/* eslint-disable-line */}
                &times;
              </span>
            </li>
          ))
}
      </ul>
    </div>
  );
}
