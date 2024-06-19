import React, { Component } from 'react';
class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      details: '',
      member: '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    //   console.log(tasks);
       Edit: false,
       curId: null,
 };
}
  componentDidUpdate(prevProps, prevState) {
// check if state change
     if(prevState.tasks == this.state.tasks) {
        // update localstorage
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    //   console.log(tasks)
}
   }
       handleChange = (e) => {
//    triggger change
       this.setState({
       [e.target.name]: e.target.value,
});
 };
    saveTask = () => {
    const { id, name, details, member,  Edit, curId } = this.state;
       if (id || name || details || member) {
      alert('Please enter all values');
      return;
 }
if (Edit) {
    // update existing task
      this.setState((prevState) => ({
         tasks: prevState.tasks.map(task =>
          task.id === curId ? { id, name, details, member } : task ),
         id: '',
         name: '',
         details: '',
          member: '',
          Edit: false,
          curId: null,
})
);
        } else {
        // add newtask
      const newTask = { id, name, details, member };
        this.setState((prevState) => ({
        id: '',
        name: '',
        details: '',
        member: '',
        tasks: [...prevState.tasks, newTask],
})
);
}
  };
      editTask = (id) => {
       const EditTask = this.state.tasks.find(task => task.id === id);
       this.setState({
       id:EditTask .id,
          name: EditTask.name,
          details: EditTask.details,
            member: EditTask.member,
        Edit: true,
        curId: id,
       });
// });
};
       deleteTask = (id) => {
    // filter task to delete
           this.setState((prevState) => ({
             tasks: prevState.tasks.filter(task => task.id == id),
})
);
};
          renderTasks = (tasks) => { return tasks.map((task) => (
        <li key={task.id}>
<span>
          <strong>ID:</strong> {task.id}<br/>
              <strong>Name:</strong> {task.name}<br/>
              <strong>Details:</strong> {task.details}<br/>
               <strong>Member:</strong> {task.member}
</span>
        <button className="btn btn-primary" onClick={() => this.editTask(task.id)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => this.deleteTask(task.id)}>
          Delete
        </button>
</li>
));
};
         render() {
    const { id, name, details, member, tasks, Edit } = this.state;
    return (
      <div className="App">
        <h1>Todo List</h1>
        <input type="text" value={id} onChange={this.handleChange} name="id" placeholder="Task ID"/>
           <input type="text" value={name} onChange={this.handleChange} name="name"
           placeholder="Task Name"/>
          <input type="text" value={details} onChange={this.handleChange} name="details"placeholder="Task Details"/>
           <input type="text" value={member} onChange={this.handleChange} name="member"placeholder="Task Member"/>
 <button id="saveBtn" onClick={this.saveTask}>
 {Edit ? 'Update Task' : 'Add Task'}
</button>
     <div className="task-columns">
     <div className="task-column">
            <h2>Tasks</h2>
<ul id="taskList">{this.renderTasks(tasks)}</ul>
</div>
    </div>
</div>
);
}
}
export default TodoApp;


// import React, { useState, useEffect } from 'react';
// import TaskForm from "./TaskForm";
// import TaskList from "./TaskList";
// import TaskItem from "./TaskItem";
// import TaskModel from "./TaskModel";
// import { Button, Modal } from 'react-bootstrap';
// //import './todoapp.css';
// const TodoApp = () => {
//     const [taskId, setTaskId] = useState('');
//     const [taskName, setTaskName] = useState('');
//     const [taskDetails, setTaskDetails] = useState('');
//     const [member, setMember] = useState('');
//     const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
//     const [inProgressTasks, setInProgressTasks] = useState(JSON.parse(localStorage.getItem('inProgressTasks')) || []);
//     const [completedTasks, setCompletedTasks] = useState(JSON.parse(localStorage.getItem('completedTasks')) || []);
//     const [showModel, setShowModel] = useState(false);
//     const [currentTask, setCurrentTask] = useState(null);
//     useEffect(() => {
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//         localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks));
//         localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
//     }, [tasks, inProgressTasks, completedTasks]);
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'taskId') setTaskId(value);
//         if (name === 'taskName') setTaskName(value);
//         if (name === 'taskDetails') setTaskDetails(value);
//         if (name === 'member') setMember(value);
//     };
//     const addTask = () => {
//         if (!taskId || !taskName || !taskDetails || !member) {
//             alert('Please enter all values');
//             return;
//         }
//         const newTask = { id: taskId, name: taskName, details: taskDetails, member };
//         setTasks([...tasks, newTask]);
//         setTaskId('');
//         setTaskName('');
//         setTaskDetails('');
//         setMember('');
//         setShowModel(false);
//     };
//     const moveTask = (id, destination) => {
//         let taskToMove;
//         if (destination === 'inProgress') {
//             const taskIndex = tasks.findIndex((task) => task.id === id);
//             taskToMove = tasks.splice(taskIndex, 1)[0];
//             setTasks([...tasks]);
//             setInProgressTasks([...inProgressTasks, taskToMove]);
//         } else if (destination === 'completed') {
//             const taskIndex = inProgressTasks.findIndex((task) => task.id === id);
//             taskToMove = inProgressTasks.splice(taskIndex, 1)[0];
//             setInProgressTasks([...inProgressTasks]);
//             setCompletedTasks([...completedTasks, taskToMove]);
//         }
//     };
//     const showModelTask = (task) => {
//         setCurrentTask(task);
//         setShowModel(true);
//     };
//     const closeModel = () => {
//         setShowModel(false);
//         setCurrentTask(null);
//     };
//     const openModel = () => setShowModel(true);
//     return (
//         <div className="App">
//             <h1>Todo List</h1>
//             <Button variant="primary" onClick={openModel}>Add Task</Button>
//             <Modal show={showModel} onHide={closeModel}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{currentTask ? 'Edit Task' : 'Add Task'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <TaskForm
//                         taskId={taskId}
//                         taskName={taskName}
//                         taskDetails={taskDetails}
//                         member={member}
//                         handleChange={handleChange}
//                         addTask={addTask}
//                     />
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={closeModel}>Close</Button>
//                     <Button variant="primary" onClick={addTask}>Save Changes</Button>
//                 </Modal.Footer>
//             </Modal>
//             <div className="task-columns">
//                 <div className="task-column">
//                     <TaskList tasks={tasks} moveTask={moveTask} destination="todo" showModelTask={showModelTask} />
//                 </div>
//                 <div className="task-column">
//                     <h1>In Progress</h1>
//                     <TaskList tasks={inProgressTasks} moveTask={moveTask} destination="inProgress" />
//                 </div>
//                 <div className="task-column">
//                     <h2>Completed</h2>
//                     <TaskList tasks={completedTasks} moveTask={moveTask} destination="completed" showModelTask={showModelTask} />
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default TodoApp;


