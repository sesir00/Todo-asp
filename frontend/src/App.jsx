import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import TodoList from './Components/TodoList';
import './App.css'

function App() {

  return (
    <>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <TodoList />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
