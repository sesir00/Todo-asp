// src/components/TodoItem.js
import React from 'react';
import './TodoItem.css';

// Function to format the date nicely (optional)
const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    try {
        // Assuming dateString is like "2022-12-31T00:00:00"
        const date = new Date(dateString);
        // Check if the date is valid after parsing
         if (isNaN(date.getTime())) {
             return 'Invalid date'; // Handle cases where parsing fails
         }
        // Format to Locale Date String (e.g., "12/31/2022" in en-US)
        return date.toLocaleDateString(undefined, { // undefined uses browser default locale
             year: 'numeric',
             month: 'short', // 'long', 'short', 'numeric'
             day: 'numeric'
         });
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return dateString; // Fallback to original string on error
    }
};


// Function to get priority text/style
const getPriorityDetails = (priority) => {
    switch (priority) {
        case 1: return { text: 'High', className: 'priority-high' };
        case 2: return { text: 'Medium', className: 'priority-medium' };
        case 3: // Fallthrough intentional
        default: return { text: 'Low', className: 'priority-low' };
    }
};

// Removed onToggleComplete from props
const TodoItem = ({ todo, onDeleteTodo }) => {
    const handleDelete = () => {
        onDeleteTodo(todo.id);
    };

    const priorityDetails = getPriorityDetails(todo.priority);

    return (
        <li className="todo-item">
            <div className="todo-main">
                <span className="todo-title">{todo.title}</span>
                {todo.description && <p className="todo-description">{todo.description}</p>}
            </div>
            <div className="todo-details">
                 <span className={`todo-priority ${priorityDetails.className}`}>
                    {priorityDetails.text}
                </span>
                 <span className="todo-due-date">{formatDate(todo.dueDate)}</span>
                 <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>

        </li>
    );
};

export default TodoItem;