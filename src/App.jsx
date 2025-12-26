import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './appwriteConfig';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const { total, rows } = await db.listRows({
        databaseId: import.meta.env.VITE_APPWRITE_DB_ID,
        tableId: import.meta.env.VITE_APPWRITE_TABLE_TODO,
      });
      // Debug log to see the structure
      console.log('Fetched rows:', rows); 
      setTasks(rows);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };

  const toggleTask = async (taskId, currentCompleted) => {
    try {
      // Update in Appwrite
      await db.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_DB_ID,
        tableId: import.meta.env.VITE_APPWRITE_TABLE_TODO,
        rowId: taskId,
        data: {
          completed: !currentCompleted
        }
      });
      
      // Update local state
      setTasks(tasks.map(task => 
        task.$id === taskId ? { ...task, completed: !currentCompleted } : task
      ));
    } catch (error) {
      console.log('Error toggling task:', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="app">
      <h1 className="title">All Tasks</h1>
      <div className="task-list">
        {tasks.map(task => (
          <div 
            key={task.$id} 
            className={`task-item ${task.completed ? 'completed' : ''}`}
            onClick={() => toggleTask(task.$id, task.completed)}
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
            <span className="task-text">{task.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
}