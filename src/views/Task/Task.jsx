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
    <div className="w-full px-10 py-5 mx-auto  flex flex-col min-h-screen bg-[#0e0e0e] text-white">
      {selectedTask && (
         <TaskModal
                milestoneId={selectedTask.milestone_id}
                visible={showModel}
                onClose={handleClose}
                update={true}
                task={selectedTask}
              />
      )}
      <h1 className="text-2xl font-bold mb-4 text-center">Tasks</h1>

      {hasTasks ? (
        <div>
          {goals.map(
            (goal) =>
              milestones[goal.id]?.length > 0 && (
                <div key={goal.id} >
                  {milestones[goal.id].map((milestone) => (
                    <div key={milestone.id} className="">
                      <ul className="list-none grid grid-cols-2 gap-4">

                        {tasks[milestone.id].map((task) => (
                          <li
                            key={task.id}
                            className="p-3 bg-[#2a2a2a] rounded-lg hover:bg-gray-700 transition-all mb-4 flex justify-between"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex gap-2">
                                  <h4 className="font-bold text-2xl">{task.title}</h4>
                                  <span
                                    className={`capitalize px-1 h-[20px] rounded-lg text-xs ${task.priority === "high"
                                      ? "bg-red-500 text-white"
                                      : task.priority === "medium"
                                        ? "bg-yellow-500 text-black"
                                        : "bg-green-500 text-white"
                                      }`}
                                  >
                                    {task.priority || "Low"}
                                  </span>
                                </div>

                                <p className="w-2/3 h-[60px] overflow-scroll no-scrollbar text-sm text-gray-400">{task.description || "No description provided."} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas odio facere autem eligendi dolores adipisci perferendis voluptatum debitis velit sapiente quo est, consequatur, necessitatibus vero nostrum laudantium. Quod, ratione delectus?</p>
                              </div>
                            </div>
                            <div className="text-sm flex flex-col items-end">
                              <div className="group">

                                <span className="cursor-pointer">
                                  <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                </span>


                                <div className="absolute z-30  p-2 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <span
                                    onClick={() => handleUpdateClick(task)}
                                    className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 mb-1"
                                  >
                                    <ion-icon name="cloud-upload-outline" className="mr-1"></ion-icon> Update
                                  </span>
                                  <span
                                    onClick={() => confirmDelete(task)}
                                    className="flex items-center cursor-pointer text-red-500 hover:text-red-700"
                                  >
                                    <ion-icon name="trash-outline" className="mr-1"></ion-icon> Delete
                                  </span>
                                </div>
                              </div>
                              <span className="text-gray-400">
                                <b>Due Date:</b> {formatDate(task.due_date) || "N/A"}
                              </span>
                              <div>


                              <button
                                  onClick={() => handleStatus(task)}
                                  className={`w-32 h-12 rounded-lg font-bold text-white shadow-md transition-all duration-200 flex items-center justify-center ${task.status === "in_progress" && "bg-blue-500 hover:bg-blue-600"
                                    } ${task.status === "pending" && "bg-blue-500 hover:bg-blue-600"
                                    } ${task.status === "completed" && "bg-green-500 hover:bg-green-600"
                                    }`}
                                >
                                  {task.status === "pending" && <b>In Progress</b>}
                                  {task.status === "in_progress" && <b>In Progress</b>}
                                  {task.status === "completed" && <b>Completed</b>}
                                </button>
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
        <MileStoneAndTask milestones={milestones}/>
        </div>
      )}
    </div>
  );
};

export default TasksList;
