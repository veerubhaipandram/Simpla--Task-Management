import React from 'react';

const PriorityList = ({ tasks }) => {
  const highPriority = tasks.filter((task) => task.priority === 'High');
  const mediumPriority = tasks.filter((task) => task.priority === 'Medium');
  const lowPriority = tasks.filter((task) => task.priority === 'Low');

  return (
    <div>
      <h3>Priority List</h3>
      <div className="row">
        <div className="col">
          <h4>High Priority</h4>
          <ul>
            {highPriority.map((task) => <li key={task._id}>{task.title}</li>)}
          </ul>
        </div>
        <div className="col">
          <h4>Medium Priority</h4>
          <ul>
            {mediumPriority.map((task) => <li key={task._id}>{task.title}</li>)}
          </ul>
        </div>
        <div className="col">
          <h4>Low Priority</h4>
          <ul>
            {lowPriority.map((task) => <li key={task._id}>{task.title}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PriorityList;
