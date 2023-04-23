import React from "react";

function TodoItem({ todo, onUpdateTodo, onDeleteTodo, url }) {
  const { description, id, completed } = todo;

  function handleCompleted(completed) {
    // persist changes on server
    console.log(completed);
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completed }),
    })
      .then((r) => r.json())
      // then use onAddTodo to add todo to state
      .then((todo) => onUpdateTodo(id,todo,completed));
    // then use onUpdateTodo to update todo in state
  }

  function handleDelete() {
    // persist changes on server
    fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    // then use onDeleteTodo to remove todo from state
    onDeleteTodo(id);
  }

  return (
    <li>
      <strong>{description}</strong>
      <label>
        Completed?
        <input
          type="checkbox"
          onChange={(e) => handleCompleted(e.target.checked)}
          checked={completed}
        />
      </label>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;
