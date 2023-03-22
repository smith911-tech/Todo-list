import { useState, useEffect } from "react";
    function App() {
    const [Todolist, setTodolist] = useState(() => {
        const saveTodo = localStorage.getItem("Todolist");
        return saveTodo ? JSON.parse(saveTodo) : [];
    });
    const [inputTodovalue, setinputTodovalue] = useState("");
    const [Updating, setUpdating] = useState(false);
    const [Currenttodo, setCurrenttodo] = useState({});
    useEffect(() => {
        localStorage.setItem("Todolist", JSON.stringify(Todolist));
    }, [Todolist]);
    function Addtodolist() {
  if (inputTodovalue.trim() !== "") {
    const newTodoItem = {
      id: Date.now(),
      text: inputTodovalue,
      time: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short', hour12: true })
    };
    setTodolist([...Todolist, newTodoItem]);
    setinputTodovalue("");
  }
}

    function changeinput(e) {
        setinputTodovalue(e.target.value);
    }
    function DeleteTodolist(index) {
        const newTodolist = [...Todolist];
        newTodolist.splice(index, 1);
        setTodolist(newTodolist);
    }
    function UpdateTodoClick(id, text) {
        const updatedTodolist = Todolist.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
        );
        setTodolist(updatedTodolist);
        setUpdating(false);
        setCurrenttodo({});
    }
    function handleUpdateClick(todo) {
        setUpdating(true);
        setCurrenttodo(todo);
    }
    const handleCheckboxClick = (index) => {
    setTodolist((prevTodolist) =>
        prevTodolist.map((todo, todoIndex) => {
        if (index === todoIndex) {
            return {
            ...todo,
            completed: !todo.completed // toggle the completed property
            };
        }
        return todo;
        })
    );
    };


    return (
        <>
        <div className="body-todo">
            <fieldset>
            <legend>
                <h2>TO DO LIST</h2>
            </legend>
            {Updating ? (
                <>
                <input
                    onChange={(e) =>
                    setCurrenttodo({ ...Currenttodo, text: e.target.value })
                    }
                    value={Currenttodo.text}
                    placeholder="Change your input"
                    type="text"
                    className="input-list"
                />
    <span className="checkbox">
    </span>
                <button
                    className="submit-btn"
                    onClick={() => UpdateTodoClick(Currenttodo.id, Currenttodo.text)}
                >
                    Update
                </button>
 
                </>
            ) : (
                <>
                <input
                    onChange={changeinput}
                    value={inputTodovalue}
                    placeholder="Enter your To input"
                    type="text"
                    className="input-list"
                />
                <button onClick={Addtodolist} className="submit-btn">
                    Submit
                </button>
                </>
            )}
            <ul>
                {Todolist.map((todo, index) => (
                <li key={todo.id}>
                    <span className="time">{todo.time}</span>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxClick(index)}
                />
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.text}
                </span>
                    <div className="div-edit-update">
                    <i onClick={() => handleUpdateClick(todo)}
                        className="fa-solid fa-pen-to-square"
                    ></i>
                    <i
                        onClick={() => DeleteTodolist(index)}
                        className="fa-sharp fa-solid fa-trash"
                    ></i>
                    </div>
                </li>
                ))}
            </ul>
            </fieldset>
        </div>
        </>
    );
    }
    export default App;