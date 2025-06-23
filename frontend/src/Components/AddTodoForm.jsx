// src/components/AddTodoForm.js
import React, { useState } from 'react';
import './AddTodoForm.css';

const AddTodoForm = ({ onAddTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(3); // Default priority (e.g., 1=High, 2=Med, 3=Low)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title is required!"); // Basic validation
            return;
        }
         // Basic validation for dueDate format (YYYY-MM-DD) - enhance as needed
        if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
            alert("Due Date must be in YYYY-MM-DD format.");
            return;
        }


        // Construct the object matching the new API structure
        const newTodoData = {
            title,
            description,
            // Ensure dueDate is sent in a format the API expects (e.g., ISO string or just date)
            // If the API expects a full DateTimeOffset, adjust accordingly.
            // Sending YYYY-MM-DD might be sufficient if the API handles the time part.
            dueDate: dueDate ? `${dueDate}T00:00:00` : null, // Append time if needed by API, handle empty date
            priority: parseInt(priority, 10), // Ensure priority is a number
        };

        onAddTodo(newTodoData);

        // Clear form
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority(3);
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
            <div className="form-row">
                <input
                    type="text"
                    placeholder="Todo Title*"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required // HTML5 validation
                    className="form-input title-input"
                />
                 <input
                    type="date" // Use date input type
                    placeholder="Due Date (YYYY-MM-DD)"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                     className="form-input date-input"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-input priority-select"
                >
                    <option value={1}>High Priority</option>
                    <option value={2}>Medium Priority</option>
                    <option value={3}>Low Priority</option>
                </select>

            </div>
             <div className="form-row">
                 <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input description-input"
                    rows="2"
                />
             </div>
             <div className="form-row button-row">
                 <button type="submit" className="add-button">Add Todo</button>
             </div>
        </form>
    );
};

export default AddTodoForm;