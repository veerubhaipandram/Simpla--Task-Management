import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm"; // Import TaskForm
import TaskEdit from "../components/tasks/TaskEdit"; // Import TaskEdit

const Dashboard = () => {
  const { user, setLoggedIn, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // State for the task being edited
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Fetch tasks for the logged-in user
      fetch("https://simple-task-management-system.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.tasks) {
            setTasks(data.tasks);
          }
        })
        .catch((err) => console.error("Failed to fetch tasks:", err));
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const addTask = (newTask) => {
    fetch("https://simple-task-management-system.onrender.com/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.task) {
          setTasks([...tasks, data.task]);
        }
      })
      .catch((err) => console.error("Failed to add task:", err));
  };

  const updateTask = (updatedTask) => {
    if (!updatedTask.id) {
      console.error("Task ID is missing!");
      return; // Ensure task ID is present before making the request
    }

    fetch(`https://simple-task-management-system.onrender.com/api/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.task) {
          setTasks(tasks.map(task => (task.id === data.task.id ? data.task : task)));
          setEditingTask(null); // Clear editing state after update
        }
      })
      .catch((err) => console.error("Failed to update task:", err));
  };

  const deleteTask = (taskId) => {
    if (!taskId) {
      console.error("Task ID is missing!");
      return; // Ensure task ID is valid before deletion
    }

    fetch(`https://simple-task-management-system.onrender.com/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId)); // Remove deleted task from state
      })
      .catch((err) => console.error("Failed to delete task:", err));
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Welcome to Task Management</h2>
        <h3>Hello, {user?.name}</h3>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h3>Your Tasks</h3>
          <TaskForm addTask={addTask} />
          {editingTask && (
            <TaskEdit task={editingTask} updateTask={updateTask} setEditingTask={setEditingTask} />
          )}
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="mt-4">Task List</h3>
          <TaskList tasks={tasks} setEditingTask={setEditingTask} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
