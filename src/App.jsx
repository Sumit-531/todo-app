import React, { useState } from 'react';
import './app.css';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Implement REST API endpoints for user authentication', completed: false },
    { id: 2, text: 'Fix memory leak in React useEffect hook', completed: false },
    { id: 3, text: 'Refactor database queries for better performance', completed: false },
    { id: 4, text: 'Write unit tests for payment gateway integration', completed: false },
    { id: 5, text: 'Deploy Docker containers to production server', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app">
      <h1 className="title">All Tasks</h1>
      <div className="task-list">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            <div className={`checkbox ${task.completed ? 'checked' : ''}`}>
              {task.completed && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path 
                    d="M2 7L5.5 10.5L12 3.5" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="task-text">{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}