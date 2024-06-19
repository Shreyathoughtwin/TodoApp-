
import React from 'react';
import './taskfrom.css';

 const TaskForm = ({ taskId, taskName, taskDetails, member, handleChange, addTask }) => (


  
  
  <div className='task-form'>

    <input type="text" value={taskId} onChange={handleChange} name="taskId" placeholder="Task ID"/>
    <input type="text" value={taskName}   onChange={handleChange} name="taskName" placeholder=" Task Name"/>
    <input  type="text" value={taskDetails} onChange={handleChange} name="taskDetails" placeholder="Task Details" />
    <input type="text" value={member} onChange={handleChange} name="member" placeholder="Task Member"  />
    <button id="addBtn" onClick={addTask}>Add Task </button>

 </div>


  );



export default TaskForm;


