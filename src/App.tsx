import React from 'react';
import { useState, useEffect } from "react";
import './App.css';
import TodoItem from './todo'

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // 1. Define the async function
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/todos');
            const results = await response.json();
            setTodos(results);
        }
        // 2. Call the async func
        fetchData();
    }, []);

    console.log(todos);
    const todo_items = todos.map(
        todo =>
            <TodoItem text={todo["text"]} completed={todo["completed"]} />
    );
    return (
        <div className="App">
            <header className="App-header">
                <h5>To Do List</h5>
                {todo_items}
            </header>
        </div>
    );
}

export default App;
