import React from "react";
import axiosClient from "../../axiosClient";

export default function TaskList({ milestoneId,task, taskUpdate, taskDelete,fetchGoal,fetchMilestoneList, fetchTaksList }) {
  const handleStatus = async (task) => {
    if (task.status == "pending") {
      const payload = {
        status: "in_progress",
      };
  
      axiosClient.put(`milestones/${milestoneId}/tasks/${task.id}`, payload).then(() => {
        console.log('Status Updated')
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
    }
    if (task.status == "in_progress") {
      const payload = {
        status: "completed",
      };
  
      axiosClient.put(`milestones/${milestoneId}/tasks/${task.id}`, payload).then(() => {
        console.log('Status Updated')
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
    }
    if (task.status == "completed") {
      const payload = {
        status: "in_progress",
      };
  
      axiosClient.put(`milestones/${milestoneId}/tasks/${task.id}`, payload).then(() => {
        console.log('Status Updated')
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
    }
    fetchGoal();
    fetchMilestoneList();
    fetchTaksList();
}
  return <>
    <li
      key={task.id}
      className="bg-white border-[#0e0e0e] border-2 rounded-md p-3 flex justify-between items-center"
    >
      <div>
        <h5 className="font-medium text-[#0e0e0e]">{task.title}</h5>
        
            <button
              onClick={() => handleStatus(task)}
              className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'>
              {task.status == "pending" && (<b>Start</b>)}
              {task.status == "in_progress" && (<b>In Progress</b>)}
              {task.status == "completed" && (<b>Completed</b>)}
            </button>
          
        
        <span onClick={() => taskUpdate(task)} ><ion-icon name="cloud-upload-outline"></ion-icon></span>
        <span onClick={() => { taskDelete(task.id) }} > <ion-icon name="trash-outline"></ion-icon></span>
        <p className="text-sm text-[#0e0e0e]">{task.description}</p>
      </div>
      <span className="text-[#0e0e0e]">{task.status}</span>
    </li>
  </>
}