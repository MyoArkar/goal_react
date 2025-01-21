import React, { useEffect } from "react";
import axiosClient from "../../axiosClient";

export default function TaskList({ milestoneId, task, taskUpdate, taskDelete, fetchGoal, fetchMilestoneList, fetchTaksList }) {
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
  useEffect(() => {
    fetchGoal();
    fetchMilestoneList();
    fetchTaksList();
   }, [])
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


        <div className="relative group">

          <span className="cursor-pointer">
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </span>


          <div className="absolute z-50 right-0 mt-2 p-2 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span
              onClick={() => taskUpdate(task)}
              className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 mb-1"
            >
              <ion-icon name="cloud-upload-outline" className="mr-1"></ion-icon> Update
            </span>
            <span
              onClick={() => taskDelete(task.id)}
              className="flex items-center cursor-pointer text-red-500 hover:text-red-700"
            >
              <ion-icon name="trash-outline" className="mr-1"></ion-icon> Delete
            </span>
          </div>
        </div>
        <p className="text-sm text-[#0e0e0e]">{task.description}</p>
      </div>
      <span className="text-[#0e0e0e]">{task.status}</span>
    </li>
  </>
}