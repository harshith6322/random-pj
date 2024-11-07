/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "addtodo":
      return [...state, addtodo(action.payload)];
    case "toggle":
      return state.map((todo) => {
        if (todo.id === action.payload) {
          console.log(todo.id, action.payload);
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

function addtodo(todoval) {
  let date = new Date().toISOString();
  let id = Math.floor(Math.random() * 5000);
  return { id, date, todoval, completed: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [input, setInput] = useState("");
  console.log(input, todos);

  function handleForm(e) {
    e.preventDefault();
    dispatch({ type: "addtodo", payload: input });
    setInput("");
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {todos.length === 0 ? (
          <div>No todos</div>
        ) : (
          todos.map((todo) => (
            <Todo todo={todo} key={todo.id} dispatch={dispatch} />
          ))
        )}
      </div>
    </>
  );
}

function Todo({ todo, dispatch }) {
  function handleToogle() {
    dispatch({ type: "toggle", payload: todo.id });
  }
  function handleDelete() {
    dispatch({ type: "delete", payload: todo.id });
  }

  return (
    <div>
      <h4 key={todo.id}>
        {todo.date} || {todo.todoval} || {todo.completed + ""}
      </h4>
      <button onClick={handleToogle}>toggle</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}

export default App;
