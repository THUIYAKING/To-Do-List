import React, { useState } from "react";
import './App.css'
import Switcher from './component/Switch'
import { useContext } from 'react'
import { ThemeContext } from './context/themeContext'





function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function TodoItem({ todo, onDelete }) {
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="Add a new to-do"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const {theme} = useContext(ThemeContext)
  const handleAdd = text => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const handleDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const themeColor = {
    backgroundColor: theme === 'light' ? 'white' : 'black',
    color: theme === 'light' ? 'black' : 'white'
  }

  return (
    <div >
      <h1>To-Do List</h1>
      <TodoList todos={todos} onDelete={handleDelete} />
      <AddTodoForm onAdd={handleAdd} />
      <Switcher/>
    </div>
  );
}

export default App;

