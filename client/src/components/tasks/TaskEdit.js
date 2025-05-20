import React, { useState } from 'react';

const formatDateForInput = (isoDate) => {
  if (!isoDate) return '';
  return new Date(isoDate).toISOString().split('T')[0];
};

const TaskEdit = ({ task, updateTask, setEditingTask }) => {
  const [updatedTask, setUpdatedTask] = useState({
    ...task,
    dueDate: formatDateForInput(task.dueDate),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Task before submission:", updatedTask);

    if (!updatedTask._id) {
      console.error("Task ID is missing in handleSubmit!");
      return;
    }

    // Map `_id` to `id` if the backend expects `id` instead of `_id`
    const formattedTask = { ...updatedTask, id: updatedTask._id };
    updateTask(formattedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-sm">
      <h4 className="mb-3">Edit Task</h4>
      <div className="form-group mb-3">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={updatedTask.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          value={updatedTask.description}
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
          value={updatedTask.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label>Priority</label>
        <select
          className="form-control"
          name="priority"
          value={updatedTask.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-success me-2">Save</button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setEditingTask(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskEdit;
