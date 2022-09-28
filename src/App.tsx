import React from 'react';
import { useState, useEffect } from "react";
import { AnchorButton, EditableText } from "@blueprintjs/core";
import './App.css';
import TodoItem from './todo'
import { post } from './utils'


async function createTodo(text: string) {
    const url = `http://localhost:8000/create_todo/`;
    const response = await post(url, { text: text });
    return response;
}


function App() {
    const [todos, setTodos] = useState([]);
    const [shouldRenderNewTodo, setShouldRenderNewTodo] = useState(false);

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
                <EditableText defaultValue="" isEditing={true} maxLength={100} placeholder="Add To Do" onConfirm={(text) => {
                    setShouldRenderNewTodo(false);
                    createTodo(text);
                }} />
                {todo_items}
            </header>
        </div>
    );
}

export default App;
