import React from 'react';
import { useState, useEffect } from "react";
import { AnchorButton } from "@blueprintjs/core";
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

    const todo_items = todos.map(
        todo =>
            <TodoItem id={todo["id"]} text={todo["text"]} completed={todo["completed"]} />
    );
    return (
        <div className="App">
            <header className="App-header">
                <h2>To Do List</h2>
                {todo_items}
                <AnchorButton intent="primary" icon="add"/>
            </header>
        </div>
    );
}

export default App;
