// import React, { useEffect, useState } from "react";
// import "./App.css";
// import FoxImage from "./FoxImage";
// //fetching data(key),setinterva;, update part of the page outside of react

// function App() {
//   const [count, setCount] = useState(0);
//   const [search, setSearch] = useState("");

//   function Clock() {
//     const [time, setTime] = useState(new Date());

//     useEffect(() => {

//       const intervalId = setInterval(() => {
//         console.log("running")
//         setTime(new Date());
//       }, 1000);

//       return function() {
//         console.log("cleanup")
//         clearInterval(intervalId)
//       }

//     }, []);
//     return <div>{time.toString()}</div>;
// }

//   //dependency array. if the array is empyt the useEffect will only run once

//   console.log("Component rendering");

//   return (
//     <div className="App">
//       <h1>Full CRUD</h1>
//       {/* <h1>Use effect</h1>
//       <button onClick={() => setCount(count + 1)}>Click me {count}</button>

//       <input
//         type="text"
//         placeholder="Type away..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       /> */}
//       {/* <FoxImage/> */}

//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";

const url = "http://localhost:5000/todos";
function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((todos) => setTodos(todos));
  }, []);

  function addTodo(newTodo) {
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos);
    
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function updateTodo(id, completed) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodo} url={url} />
      <TodoList todos={todos} url={url} onDeleteTodo={deleteTodo} onUpdateTodo={updateTodo}/>
    </div>
  );
}

export default App;
