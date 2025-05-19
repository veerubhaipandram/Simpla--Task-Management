import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = ({ tasks, setEditingTask, deleteTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Ensure the current page is valid when the number of tasks changes
  useEffect(() => {
    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks, currentPage, tasksPerPage]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-center mb-4">Task List</h2>
      {tasks.length === 0 ? (
        <p className="text-center">No tasks available. Please create some tasks.</p>
      ) : (
        <>
          <ul className="list-group">
            {currentTasks.map((task) => (
              <li key={task.id || task._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                  <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                </div>
                <div>
                  <button
                    onClick={() => setEditingTask(task)}
                    className="btn btn-warning btn-sm mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id || task._id)}
                    className="btn btn-danger btn-sm mx-1"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handlePrevPage}>
                  Previous
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Page {currentPage} of {totalPages}</span>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={handleNextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default TaskList;
