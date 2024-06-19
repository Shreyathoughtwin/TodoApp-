
import React from 'react';
 import TaskItem from '../TaskItem/TaskItem';
 import './tasklist.css';

const TaskList = ({ tasks, moveTask, destination,showModeltask}) => (

<ul>

    {tasks.map((task) => (
      
  <TaskItem key={task.id} task={task} moveTask={moveTask} 
  destination={destination} showModeltask={showModeltask} />
       
))}
 
  </ul>


);
export default TaskList;

