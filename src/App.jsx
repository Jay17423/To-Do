import React from "react";
import { useRef } from "react";
import { useState } from "react";

const App = () => {
  const todo = useRef();
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const addTodos = () => {
    event.preventDefault();
    if(editIndex !== null){
      const updated = [...todos];
      updated[editIndex] = todo.current.value;
      setTodos(updated);
      setEditIndex(null);
    }else{
      setTodos([...todos, todo.current.value]);
    }
  };

  const handleComplete = (index) => {
    event.preventDefault();
    setCompleted([...completed, todos[index]]);
    const updatedTodos = todos.filter((item, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    event.preventDefault();
    const data = todos[index];
    todo.current.value = data;
    setEditIndex(index);
    
    
  }


  

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl">To-Do App</h1>
      <form className="mt-4">
        <input
          type="text"
          placeholder="Enter your To-do"
          className="border border-gray-300 p-2 rounded"
          ref={todo}
        />
        <button
          className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addTodos}
        >
          Add
        </button>
        <ul>
          {todos.map((todo, index) => {
            return (
              <div className="flex justify-between m-2 ">
                <li className="font-bold text-gray-600 m-1 " key={index}>
                  {todo}
                </li>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold  px-2 rounded"
                  key={index}
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold  px-2 rounded"
                  key={index}
                  onClick={() => handleComplete(index)}
                >
                  Complete
                </button>
              
              </div>
            );
          })}
        </ul>
        <div className=" flex flex-col border border-gray-300 p-2 rounded">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-blue-600">Completed Todos</h1>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold  px-2 rounded"
              onClick={() => setCompleted([])}
            >
              Clear
            </button>
          </div>
          <div>
            <ul>
              {completed.map((todo, index) => {
                return (
                  <div className="flex justify-between m-2 ">
                    <li className="font-bold text-gray-600 m-1 " key={index}>
                      {todo}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
