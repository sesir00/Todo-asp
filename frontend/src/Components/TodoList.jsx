// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/TodoApi'; // updateTodo might not be used yet
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Todos
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        setError(null);
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'MISSING_ENV_VAR';
        try {
            const response = await getTodos();
            console.log("API Response:", response.data.data);
            // Ensure response.data is an array before setting state
            setTodos(Array.isArray(response.data.data) ? response.data.data : []);
            const isArray = Array.isArray(response.data.data);
            console.log("Is response.data.data an array?", isArray);
            console.log("Todo Usestate",todos);
        } catch (err) {
            console.error("Failed to fetch todos:", err);
            // Improved error message
             let errorMessage = `Failed to fetch todos. Is the API running at ${apiUrl}? `;
             if (err.response) {
                 // API responded with an error status (4xx, 5xx)
                 errorMessage += `Status: ${err.response.status}. Data: ${JSON.stringify(err.response.data)}`;
             } else if (err.request) {
                 // Request was made but no response received (CORS, network error, API down)
                 errorMessage += `No response received. Check API status, network, and CORS configuration.`;
             } else {
                 // Error setting up the request
                 errorMessage += `Request setup error: ${err.message}`;
             }
             setError(errorMessage);
            setTodos([]); // Set to empty array on error
        } finally {
            setLoading(false);
        }
    };

    // Add Todo
    const handleAddTodo = async (newTodoData) => {
         // Add optimistic UI update placeholder if desired
        setError(null); // Clear previous errors
        try {
            const response = await addTodo(newTodoData);
            // Add the newly created todo (returned from API with ID) to the state
            setTodos([...todos, response.data]);
        } catch (err) {
             console.error("Failed to add todo:", err);
             setError(`Failed to add todo. ${err.message}`);
        }
    };

    // NOTE: Update functionality is not implemented in the UI yet,
    // as the new JSON structure doesn't have an obvious "toggle".
    // You would add an "Edit" button and form later if needed,
    // calling updateTodo(id, updatedData).

    // Delete Todo
    const handleDeleteTodo = async (id) => {
         // Optimistic UI update (remove immediately)
         const originalTodos = [...todos];
         setTodos(todos.filter(todo => todo.id !== id));
         setError(null); // Clear previous errors

        try {
            await deleteTodo(id);
            // If successful, state is already updated
        } catch (err) {
             console.error("Failed to delete todo:", err);
             setError(`Failed to delete todo with ID ${id}. ${err.message}`);
             // Revert UI if API call failed
             setTodos(originalTodos);
        }
    };

    return (
        <div className="todo-list-container">
            {/* Title moved to Navbar, maybe add a sub-header if needed */}
            {/* <h1>My Todos</h1> */}
            {error && <p className="error-message">{error}</p>}

            <AddTodoForm onAddTodo={handleAddTodo} />

            <h2>Current Todos</h2>
            {loading ? (
                <p>Loading todos...</p>
            ) : (
                <ul className="todo-list">
                    {todos.length === 0 && !loading ? (
                         <li className="no-todos-message" style={{color:"black"}}>No todos yet. Add one above!</li>
                    ) : (
                        todos.map(todo => (
                            <TodoItem
                                key={todo.id} // Assuming API still provides 'id'
                                todo={todo}
                                // onToggleComplete is removed
                                onDeleteTodo={handleDeleteTodo}
                            />
                        ))
                    )}
                </ul>
            )}
             <button onClick={fetchTodos} disabled={loading} className="refresh-button">
                {loading ? 'Refreshing...' : 'Refresh List'}
             </button>
        </div>
    );
};

export default TodoList;