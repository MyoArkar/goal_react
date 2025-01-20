import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import TaskModal from "./TaskModal";
import TaskList from "./TaskList";
export default function MilestoneAndTask({goalId,fetchGoal, milestone, milestoneUpdate, milestoneDelete, fetchMilestoneList }) {

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
      fetchTaksList();
    } catch (error) {
      console.error("Error deleting Task:", error);
      // alert("Failed to delete Task. Please try again.");
    }
  };
  const handleStatus = async (milestone) => {
    if (milestone.status == "pending") {
      const payload = {
        status: "in_progress",
      };
  
      axiosClient.put(`/goals/${goalId}/milestones/${milestone.id}`, payload).then(() => {
        console.log('Status Updated')
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
      };
  
      axiosClient.put(`/goals/${goalId}/milestones/${milestone.id}`, payload).then(() => {
        console.log('Status Updated')
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
}
  useEffect(() => {
    fetchTaksList();
  }, [])



  const toggleMilestone = (milestoneId) => {
    setActiveMilestone((prev) => (prev === milestoneId ? null : milestoneId));
  };
  return <>
    <div key={milestone.id} className="border-[#0e0e0e] border-2 rounded-md">
      <TaskModal
        milestoneId={milestone.id}
        visible={showModel}
        onClose={handleClose}
        update={update}
        task={selectedTask}
      />
      <div
        className="flex justify-between items-center bg-slate-950 text-defaultText px-4 py-3 cursor-pointer"
      >
        <h3
          onClick={() => toggleMilestone(milestone.id)} className="font-medium">{milestone.title}</h3>
        {
          milestone.task_count == 0 && (
            <button
              onClick={() => handleStatus(milestone)}
              className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'>
              {milestone.status == "pending" && (<b>Start</b>)}
              {milestone.status == "in_progress" && (<b>In Progress</b>)}
              {milestone.status == "completed" && (<b>Completed</b>)}
            </button>
          )
        }
        <span onClick={() => milestoneUpdate(milestone)} ><ion-icon name="cloud-upload-outline"></ion-icon></span>
        <span onClick={() => { milestoneDelete(milestone.id) }} > <ion-icon name="trash-outline"></ion-icon></span>
      </div>
      <div className='relative w-full bg-white rounded overflow-hidden h-2'>
        <div style={{ width: `${milestone.progress_percentage}%` }} className='absolute h-2 bg-sky-500'></div>
      </div>

      {activeMilestone === milestone.id && (
        <div className="bg-slate-100 px-4 py-3">
          <h4 className="text-[#0e0e0e] font-semibold mb-2">{milestone.id}</h4>
          <div onClick={handleCreateClick}
            className='bg-[#0e0e0e] hover:pr-1  rounded-lg text-[#0e0e0e] transition duration-300  mb-4 '>
            <div class="bg-teal-200 rounded-lg border-2 border-[#0e0e0e] hover:border-b-4 flex items-center justify-center transition duration-300">
              <ion-icon name="add-outline" size="large"></ion-icon>
            </div>
          </div>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <TaskList milestoneId={milestone.id} task={task} taskUpdate={handleUpdateClick} taskDelete={handleDelete} fetchGoal={fetchGoal} fetchMilestoneList={fetchMilestoneList} fetchTaksList={fetchTaksList} />
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
}