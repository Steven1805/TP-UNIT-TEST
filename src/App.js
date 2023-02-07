import React, { useState } from 'react';
import './App.css'

function App() {
  const [todoItems, setTodoItems] = useState([
  ]);

  const [doneItems, setDoneItems] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleCheckboxChange = (id) => {
    const updatedTodoItems = todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, done: true };
      }
      return item;
    });

    setDoneItems([
      ...doneItems,
      ...updatedTodoItems.filter((item) => item.done),
    ]);
    setTodoItems(updatedTodoItems.filter((item) => !item.done));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodoItems([...todoItems, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo("");
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          data-testid="todoinput"
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button data-testid="todosubmit" className='add-todo' type="submit">Add Todo</button>
      </form>
      <div className='Todos'>
      <div>
      <h2>To-Do</h2>
      <ul data-testid="todoitems" >
        {todoItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.text}
          </li>
        ))}
      </ul>
      </div>
      <div>
      <h2>Done</h2>
      <ul data-testid='doneitems'>
        {doneItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      </div>
      </div>
    </div>
  );
}

export default App;
