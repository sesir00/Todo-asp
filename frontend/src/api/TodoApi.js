// src/api/todoApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-api-8f79.onrender.com/api/Todo'; // Fallback URL

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTodos = () => {
    console.log(`Fetching todos from: ${API_URL}/Todo`);
    return apiClient.get('/Todo');
};

// Accepts an object with title, description, dueDate, priority
export const addTodo = (todoData) => {
    console.log(`Adding todo to: ${API_URL}/Todo`, todoData);
    // Send the new structure
    return apiClient.post('/Todo', todoData);
};

// Accepts id and the full updated object (including id potentially, check API requirements)
export const updateTodo = (id, todoData) => {
    // The API *might* expect the ID only in the URL, or also in the body.
    // Sending the full object is common for PUT. Adjust if API differs.
    const dataToSend = { ...todoData, id: id }; // Ensure ID is included if needed by API body
    console.log(`Updating todo ${id} at: ${API_URL}/Todo/${id}`, dataToSend);
    return apiClient.put(`/Todo/${id}`, dataToSend);
};

export const deleteTodo = (id) => {
    console.log(`Deleting todo ${id} from: ${API_URL}/Todo/${id}`);
    return apiClient.delete(`/Todo/${id}`);
};

export default apiClient;