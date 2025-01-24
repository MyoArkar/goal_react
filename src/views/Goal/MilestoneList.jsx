import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";
import { formatDate } from '../../utilities/dateFormater';
export default function MileStoneList({ goalId, fetchGoal, milestone, milestoneUpdate, milestoneDelete, fetchMilestoneList }) {

  const [tasks, setTasks] = useState([]);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTaksList = async () => {
    try {
      const { data } = await axiosClient.get(`/milestones/${milestone.id}/tasks`);
      setTasks(data.data);
      console.log(data.message);
    } catch (error) {
      console.error("Error fetching Task:", error);
      // alert("Failed to fetch Task. Please try again.");
    }
  };
  const handleUpdateClick = (task) => {
    setUpdate(true);
    setSelectedTask(task);
    setShowModel(true);
  };
  const handleCreateClick = () => {
    setUpdate(false);
    setShowModel(true);
  };
  const handleClose = () => {
    setShowModel(false);
    fetchTaksList();
  };

  const handleDelete = async (taskId) => {
    try {
      await axiosClient.delete(`milestones/${milestone.id}/tasks/${taskId}`);
      console.log('Task deleted successfully');
      fetchGoal();
      fetchMilestoneList();
      fetchTaksList();
    } catch (error) {
      console.error("Error deleting Task:", error);
      // alert("Failed to delete Task. Please try again.");
    }
  };
  const confirmDelete = (taskId) => {
    const confirmed = window.confirm("Are you sure you want to delete this Task?");
    if (confirmed) {
      handleDelete(taskId);
    }
  };
  const handleStatus = async (milestone) => {
    if (milestone.status == "pending") {
      const payload = {
        status: "in_progress",
      };

      axiosClient.put(`/goals/${goalId}/milestones/${milestone.id}`, payload).then(() => {
        console.log('Status Updated');
        fetchGoal();
        fetchMilestoneList();
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
    }
    if (milestone.status == "in_progress") {
      const payload = {
        status: "completed",
        progress_percentage: 100
      };

      axiosClient.put(`/goals/${goalId}/milestones/${milestone.id}`, payload).then(() => {
        console.log('Status Updated');
        fetchGoal();
        fetchMilestoneList();
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
    }
    if (milestone.status == "completed") {
      const payload = {
        status: "in_progress",
      };

      axiosClient.put(`/goals/${goalId}/milestones/${milestone.id}`, payload).then(() => {
        console.log('Status Updated');
        fetchGoal();
        fetchMilestoneList();
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
    }
  }
  useEffect(() => {
    fetchTaksList();
  }, [])



  const toggleMilestone = (milestoneId) => {
    setActiveMilestone((prev) => (prev === milestoneId ? null : milestoneId));
  };
  return <>
    <div key={milestone.id} className="shadow-lg rounded-md overflow-hidden">
      <TaskModal
        milestoneId={milestone.id}
        visible={showModel}
        onClose={handleClose}
        update={update}
        task={selectedTask}
      />
      <div
        className="flex relative justify-between items-center bg-slate-950 text-defaultText px-4 cursor-pointer"
      >
        <div className="group">

          <span className="cursor-pointer">
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </span>
          <div className="absolute z-30 top-0 left-0 p-2 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span
              onClick={() => milestoneUpdate(milestone)}
              className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 mb-1"
            >
              <ion-icon name="cloud-upload-outline" className="mr-1"></ion-icon> Update
            </span>
            <span
              onClick={() => milestoneDelete(milestone.id)}
              className="flex items-center cursor-pointer text-red-500 hover:text-red-700"
            >
              <ion-icon name="trash-outline" className="mr-1"></ion-icon> Delete
            </span>
          </div>
        </div>
        <div
          onClick={() => toggleMilestone(milestone.id)}
          className="w-2/3 pl-6 py-4 ">
          <h3 className="font-medium text-lg">{milestone.title}</h3>
          <span className="text-slate-300"><b>Due Date:</b> {formatDate(milestone.due_date)}</span>
        </div>

        <div>
          {(milestone.task_count > 0 && milestone.status != 'completed') && (
            <button
              onClick={() => toggleMilestone(milestone.id)}
              className="w-32 h-12 rounded-md font-bold text-white shadow-md transition-all duration-200 flex items-center justify-center bg-purple-500 hover:bg-purple-600"
            >
              In Progress
            </button>
          )}
          {(milestone.task_count > 0 && milestone.status == 'completed') && (
            <button
              onClick={() => toggleMilestone(milestone.id)}
              className="w-32 h-12 rounded-md font-bold text-white shadow-md transition-all duration-200 flex items-center justify-center bg-green-500 hover:bg-green-600"
            >
              Completed
            </button>
          )}
          {milestone.task_count == 0 && (
            <button
            onClick={() => handleStatus(milestone)}
            className={`w-32 h-12 rounded-lg font-bold text-white shadow-md transition-all duration-200 flex items-center justify-center ${
              milestone.status === "in_progress" && "bg-blue-500 hover:bg-blue-600"
            } ${
              milestone.status === "pending" && "bg-blue-500 hover:bg-blue-600"
            } ${
              milestone.status === "completed" && "bg-green-500 hover:bg-green-600"
            }`}
            >   
                { milestone.status === "pending" && <b>In Progress</b>}
                { milestone.status === "in_progress" && <b>In Progress</b>}
                {milestone.status === "completed" && <b>Completed</b>}
            </button>
          )}
        </div>
      </div>
      <div className='relative w-full bg-black  overflow-hidden'>
        <div style={{ width: `${milestone.progress_percentage}%` }} className='absolute bg-sky-500'></div>
      </div>
      {activeMilestone === milestone.id && (
        <div className="bg-slate-100 px-4 py-3 flex flex-col gap-5 justify-center items-center">
          <div onClick={handleCreateClick} class="bg-white/80 ring-1 ring-blue-50 shadow-md py-2 px-3 rounded-md text-bodyText hover:bg-sidebar hover:text-defaultText w-28 cursor-pointer flex justify-center items-center">
            <ion-icon name="add-outline" size="small"></ion-icon>
          </div>
          <ul className="flex flex-col gap-3 w-full">
            {tasks.map((task) => (
              <TaskList milestoneId={milestone.id} task={task} taskUpdate={handleUpdateClick} taskDelete={confirmDelete} fetchGoal={fetchGoal} fetchMilestoneList={fetchMilestoneList} fetchTaksList={fetchTaksList} />
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
}