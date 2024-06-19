import React from "react";
// import './model.css';

const TaskModel =({show,onClose,children})=>{
    if(!show) return null;
    // console.log("TaskModel");


    return(

        <div className="model-overlay">
            <div className="model-content">

      
          <button className="close-btn" onClick={onClose}>close</button>{children}

        </div>
        </div>

)

}

export default TaskModel;

