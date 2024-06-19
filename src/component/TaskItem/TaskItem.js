
import React from 'react';
// import './taskitem.css';

const TaskItem = ({ task, moveTask, destination,showModeltask }) => (

  <li onClick={()=> showModeltask(task)}>

    <span>

        <strong>ID:</strong> {task.id} <br />
        <strong>Name:</strong> {task.name} <br />
         <strong>Details:</strong> {task.details} <br />
        <strong>Member:</strong> {task.member}

    </span>

    {destination === 'todo' && (
         <button className="btn btn-info" onClick={() => moveTask(task.id, 'inProgress')}>Move to In Progress</button>
  


)}
    {destination === 'inProgress' && (
           <button className="btn btn-success" onClick={() => moveTask(task.id, 'completed')}>Move to Complete</button>


)}

 
  </li>

);

export default TaskItem;


