
import React, { useState, useEffect } from 'react';

import TaskForm from '../TaskForm/TaskForm';
import Tasklist from '../Tasklist/Tasklist';
//  import TaskItem from '../TaskItem/TaskItem';
import TaskModel from '../model/TaskModel';
import  Button from 'react-bootstrap/Button';
import  Modal  from 'react-bootstrap/Modal';

import './todoapp.css';

const TodoApp = () => {

    const [taskId, setTaskId] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDetails, setTaskDetails] = useState('');
    const [member, setMember] = useState('');

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [inProgressTasks, setInProgressTasks] = useState(JSON.parse(localStorage.getItem('inProgressTasks')) || []);
  const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem('completedTasks')) || []);

  const[showModel,setShowModel]=useState(false);
  const[currentTask,setcurrentTask]=useState(null);

  


  // const [username] = useState(JSON.parse(localStorage.getItem('username')) || '');
 
  useEffect(() => {

      localStorage.setItem('tasks', JSON.stringify(tasks));
      // console.log('task');
       localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
       // console.log('inprogressTasks');
       localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
       // console.log('completeTasks');

}, [tasks, inProgressTasks, completedTasks]);
  const handleChange = (e) => {
   
    const { name, value } = e.target;
     if (name === 'taskId') setTaskId(value);
     if (name === 'taskName') setTaskName(value);
     if (name === 'taskDetails') setTaskDetails(value);
     if (name === 'member') setMember(value);

};

     const addTask = () => {

    if (!taskId || !taskName || !taskDetails || !member) {
      alert('Please enter all values');
      return;
  }



    const newTask = {
      id: taskId,
        name: taskName,
        details: taskDetails,
        member: member,
        // userid: username,
};

    setTasks([...tasks, newTask]);
    setTaskId('');
       setTaskName('');
     setTaskDetails('');
    setMember('');
    setShowModel(false);

 };

  const moveTask = (id, destination) => {
    let taskToMove;

    if (destination === 'inProgress') {
        const taskIndex = tasks.findIndex((task) => task.id === id);
          taskToMove = tasks.splice(taskIndex, 1)[0];
      setTasks([...tasks]);

      setInProgressTasks([...inProgressTasks, taskToMove]);

 } else if (destination === 'completed') {
        const taskIndex = inProgressTasks.findIndex((task) => task.id === id);
          taskToMove = inProgressTasks.splice(taskIndex, 1)[0];
         setInProgressTasks([...inProgressTasks]);
         setCompletedTasks([...completedTasks, taskToMove]);
}

 };
  const showModeltask=(task)=>{
    setcurrentTask(task);
    setShowModel(true);
  }

    const closeModel=()=>{
    setShowModel(false);
    setcurrentTask(null);
  }

  const openModel=()=>{
    setShowModel(true);
  }


  return (
     <div className="App">
       <h1>Todo List</h1>

       {/* <Button variant="primary" onClick={(openModel)} >Add Task</Button>
      <Modal show={showModel} onHide={closeModel} backdrop="static" keyboard={false} centered>

                <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>

                </Modal.Header>
                <Modal.Body>

        <TaskForm taskId={taskId} taskName={taskName} taskDetails={taskDetails} member={member} handleChange={handleChange} />
          </Modal.Body>
         <Modal.Footer>

          <Button variant="secondary" onClick={closeModel}>Close</Button>
          <Button variant="primary" onClick={addTask}>Add Task</Button>
         </Modal.Footer>

            </Modal> */}
       <button onClick={openModel}>Add Task</button> 

     { showModel && <TaskForm taskId={taskId} taskName={taskName}  taskDetails={taskDetails}
         member={member}handleChange={handleChange}addTask={addTask}/>}

        <div className="task-columns">
        <div className="task-column">


        {/* <h2>Todo</h2> */}
           <Tasklist tasks={tasks} moveTask={moveTask} destination="todo"
           showModeltask={showModeltask} />

    </div>

          <div className="task-column">
         <h1>In Progress</h1>

           <Tasklist tasks={inProgressTasks} moveTask={moveTask} destination="inProgress" />
        </div>

    <div className="task-column">
    <h2>Completed</h2>


         
          <Tasklist tasks={completedTasks} moveTask={moveTask} destination="completed"
          showModeltask={showModeltask} />
 </div>


    </div>

    {/* <TaskModel show={showModel} open={openModel}>
      <TaskForm>
    taskId={taskId}
    taskName={taskName}
    taskDetails={taskDetails}
    member={member}
     handleChange ={handleChange} addTask={addTask}
      </TaskForm>
    </TaskModel> */}

</div>

  );

}
;
export default TodoApp;






