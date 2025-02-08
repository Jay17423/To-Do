import { useRef, useState } from "react";

function App() {
  const todo = useRef(null);
  const [todoData, setTodoData] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [completedData, setCompletedData] = useState([]);

  const addTodoData = (event) => {
    event.preventDefault();
    const data = todo.current.value;
    if (updateIndex !== null) {
      const updatedData = [...todoData];
      updatedData[updateIndex] = data;
      setTodoData(updatedData);
      setUpdateIndex(null);
    } else {
      setTodoData([...todoData, data]);
    }
    todo.current.value = "";
  };

  const handleDelete = (index) => {
    const data = todoData[index];
    setCompletedData([...completedData, data]);
    const newData = todoData.filter((item, i) => index !== i);
    setTodoData(newData);
  };

  const handleEdit = (index) => {
    todo.current.value = todoData[index];
    setUpdateIndex(index);
  };
  const handleClear = () =>{
    setCompletedData([]);
  }

  return (
    <div className="flex justify-center items-center text-white bg-black min-h-screen">
      <div className="flex flex-col text-white w-full max-w-lg p-6">
        <h1 className="font-bold text-3xl text-center mb-6">To-Do List</h1>

        <form onSubmit={addTodoData} className="mb-6">
          <input
            type="text"
            placeholder="Enter your to-do"
            className="text-white p-2 rounded-md w-full"
            ref={todo}
          />
          <button
            className="bg-green-600 rounded-lg p-3 text-white font-bold mt-3 w-full"
            type="submit"
          >
            {updateIndex !== null ? "Update Todo" : "Add Todo"}
          </button>
        </form>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Your To-Dos</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <ul className="grid grid-cols-1 gap-4">
              {todoData.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-amber-300 p-3 rounded-lg shadow-md"
                >
                  <span className="text-black">{item}</span>
                  <div>
                    <button
                      className="bg-blue-700 p-2 rounded-md text-white mr-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-700 p-2 rounded-md text-white"
                      onClick={() => handleDelete(index)}
                    >
                      Complete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold m-4">
              {completedData.length > 0 ? "Completed Todos" : ""}
            </h2>
           {completedData.length > 0 && (<button className="bg-red-700 p-1 m-8 rounded-md w-20" onClick={() => handleClear()} >
              Clear
            </button>)}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <ul className="grid grid-cols-1 gap-4">
              {completedData.map((item, index) => (
                <li
                  key={index}
                  className="bg-blue-300 p-3 rounded-lg shadow-md"
                >
                  <span className="text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
