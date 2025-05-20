import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({ title: '', description: '', dueDate: '', priority: 'low' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm">
      <h4 className="mb-3">Add New Task</h4>
      <div className="form-group mb-3">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Due Date</label>
        <input
          type="date"
          className="form-control"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Priority</label>
        <select
          className="form-control"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">Add Task</button>
    </form>
  );
};

export default TaskForm;
