import React, { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { formatDate } from '../../utilities/dateFormater';

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
      className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      {/* Left Section */}
      <div className="flex relative flex-row  items-center gap-4">
        <div className=" group">
          {/* Ellipsis Icon */}
          <span className="cursor-pointer text-gray-500 hover:text-gray-700">
            <ion-icon name="ellipsis-horizontal-outline" size="small"></ion-icon>
          </span>

          {/* Dropdown Menu */}
          <div className="absolute z-30 -left-8 top-0 p-3 bg-white border border-gray-300 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => taskUpdate(task)}
              className="flex items-center text-sm text-blue-500 hover:text-blue-700 gap-2 mb-2"
            >
              <ion-icon name="cloud-upload-outline"></ion-icon>
              Update
            </button>
            <button
              onClick={() => taskDelete(task.id)}
              className="flex items-center text-sm text-red-500 hover:text-red-700 gap-2"
            >
              <ion-icon name="trash-outline"></ion-icon>
              Delete
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <h5 className="font-semibold text-lg text-gray-800">{task.title}
          <span className={`ml-3 px-2 rounded-lg text-xs text-white ${task.priority === 'High' ? 'bg-red-600' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
              {task.priority}
          </span>
          </h5>
          <p>{ task.description}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end  gap-2">
      <span className="text-gray-500"><b>Due Date:</b> {formatDate(task.due_date)}</span>
        <button
          onClick={() => handleStatus(task)}
          className={`w-36 h-10 rounded-md text-sm font-medium text-white shadow-md transition-all duration-200 flex items-center justify-center ${task.status === "in_progress"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {task.status === "in_progress" ? "In Progress" : "Completed"}
        </button>
      </div>
    </li>



  </>
}