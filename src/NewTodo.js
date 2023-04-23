import React, { useState } from "react";

function NewTodo({ onAddTodo, url }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const todoObj = {
      todo: {
        description: description,
        completed: false,
      },
    };

    // persist todo on server
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoObj.todo),
    })
      .then((r) => r.json())
      // then use onAddTodo to add todo to state
      .then((data) => onAddTodo(data.todo));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Todos</h2>
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add todo</button>
    </form>
  );
}

export default NewTodo;
