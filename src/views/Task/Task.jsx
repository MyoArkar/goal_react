import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { formatDate } from "../../utilities/dateFormater";
import TaskModal from "../Goal/TaskModal";
import MileStoneAndTask from "./MilestoneAndTask";

const TasksList = () => {
  const [goals, setGoals] = useState([]);
  const [milestones, setMilestones] = useState({});
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const milestonesData = {};
  const fetchData = async () => {
    try {
      // Fetch all goals
      const goalsResponse = await axiosClient.get("/goals/");
      const goalsData = goalsResponse.data.data.data;

      // Fetch milestones for each goal

      const tasksData = {};
      for (const goal of goalsData) {
        const milestonesResponse = await axiosClient.get(`/goals/${goal.id}/milestones`);
        milestonesData[goal.id] = milestonesResponse.data.data.milestones;

        // Fetch tasks for each milestone
        for (const milestone of milestonesResponse.data.data.milestones) {
          const tasksResponse = await axiosClient.get(`/milestones/${milestone.id}/tasks`);
          tasksData[milestone.id] = tasksResponse.data.data;
        }
      }

      setGoals(goalsData);
      setMilestones(milestonesData);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateClick = (task) => {
    setUpdate(true);
    setSelectedTask(task);
    setShowModel(true);
  };
  const handleClose = () => {
    setShowModel(false);
    fetchData();
  };
  const handleDelete = async (task) => {
    try {
      await axiosClient.delete(`milestones/${task.milestone_id}/tasks/${task.id}`);
      console.log('Task deleted successfully');
      fetchData();
    } catch (error) {
      console.error("Error deleting Task:", error);
      // alert("Failed to delete Task. Please try again.");
    }
  };
  const confirmDelete = (task) => {
    const confirmed = window.confirm("Are you sure you want to delete this Task?");
    if (confirmed) {
      handleDelete(task);
    }
  };
  const handleStatus = async (task) => {
    if (task.status == "pending") {
      const payload = {
        status: "in_progress",
      };

      axiosClient.put(`milestones/${task.milestone_id}/tasks/${task.id}`, payload).then(() => {
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

      axiosClient.put(`milestones/${task.milestone_id}/tasks/${task.id}`, payload).then(() => {
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

      axiosClient.put(`milestones/${task.milestone_id}/tasks/${task.id}`, payload).then(() => {
        console.log('Status Updated')
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
    }

    fetchData();
  }
  useEffect(() => {


    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading...</p>;
  }

  const hasTasks = Object.values(tasks).some((taskList) => taskList.length > 0);

  return (
    <div className="w-full px-10 py-5 mx-auto gap-10 flex flex-col min-h-screen">
      {selectedTask && (
        <TaskModal
          milestoneId={selectedTask.milestone_id}
          visible={showModel}
          onClose={handleClose}
          update={true}
          task={selectedTask}
        />
      )}

      {hasTasks ? (
        <div>
          {goals.map(
            (goal) =>
              milestones[goal.id]?.length > 0 && (
                <div key={goal.id} >
                  {milestones[goal.id].map((milestone) => (
                    <div key={milestone.id} className="">
                      <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-4">

                        {tasks[milestone.id].map((task) => (
                        <li
                        key={task.id}
                        className="bg-white/10 ring-1 ring-black/5 text-sm rounded-md shadow-lg flex flex-col gap-2 md:gap-0 lg:flex-row justify-between place-content-center px-5 py-4 mb-5 relative"
                      >
                        <div className="flex flex-col justify-center items-start text-slate-700 gap-3">
                          <h4 className="text-sm font-semibold">{task.title}</h4>
                          <p className="w-2/3 h-[20px] lg:h-[50px] overflow-scroll no-scrollbar">
                            {task.description || "No description provided."}
                          </p>
                          <span className="text-gray-400">
                            <b>Due Date:</b> {formatDate(task.due_date) || "N/A"}
                          </span>
                        </div>
                        <div className="text-sm flex flex-col justify-center items-center gap-4">
                          <span
                            className={`capitalize w-full lg:w-[150px] px-4 py-3 rounded text-sm text-center ${
                              task.priority === "high"
                                ? "bg-red-500 text-white"
                                : task.priority === "medium"
                                ? "bg-yellow-500 text-black"
                                : "bg-green-500 text-white"
                            }`}
                          >
                            {task.priority || "Low"}
                          </span>
                          <button
                            onClick={() => handleStatus(task)}
                            className={`w-full lg:w-[150px] px-4 py-3 rounded font-bold text-white text-center transition-all duration-200 ${
                              task.status === "in_progress" || task.status === "pending"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-green-500 hover:bg-green-600"
                            } text-sm md:text-sm sm:text-xs`}
                          >
                            {task.status === "pending" || task.status === "in_progress" ? (
                              <b>In Progress</b>
                            ) : (
                              <b>Completed</b>
                            )}
                          </button>
                        </div>
                        <div className="group flex justify-center items-center absolute top-0 right-3">
                          <span className="cursor-pointer">
                            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                          </span>
                          <div className="absolute z-30 p-2 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span
                              onClick={() => handleUpdateClick(task)}
                              className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 mb-1"
                            >
                              <ion-icon name="cloud-upload-outline" className="mr-1"></ion-icon>{" "}
                              Update
                            </span>
                            <span
                              onClick={() => confirmDelete(task)}
                              className="flex items-center cursor-pointer text-red-500 hover:text-red-700"
                            >
                              <ion-icon name="trash-outline" className="mr-1"></ion-icon> Delete
                            </span>
                          </div>
                        </div>
                      </li>
                      
                        
                        ))
                        }

                      </ul>
                    </div>
                  ))}
                </div>
              )
          )}</div>

      ) : (
        <div className="text-center">
          <MileStoneAndTask milestones={milestones} />
        </div>
      )}
    </div>
  );
};

export default TasksList;
