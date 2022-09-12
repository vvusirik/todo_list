import React from 'react';
import { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // 1. Define the async function
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000');
            const result = await response.json();
            setMessage(result.message);
        }
        // 2. Call the async func
        fetchData();
    }, []);

    console.log(message);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    {message}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
