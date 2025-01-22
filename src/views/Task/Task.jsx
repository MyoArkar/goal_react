import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { formatDate } from "../../utilities/dateFormater";

const TasksList = () => {
  const [goals, setGoals] = useState([]);
  const [milestones, setMilestones] = useState({});
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all goals
        const goalsResponse = await axiosClient.get("/goals/");
        const goalsData = goalsResponse.data.data.data;

        // Fetch milestones for each goal
        const milestonesData = {};
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

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const hasTasks = Object.values(tasks).some((taskList) => taskList.length > 0);

  return (
    <div className="w-full px-10 py-5 mx-auto  flex flex-col min-h-screen bg-[#0e0e0e] text-white">
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
                            className="p-3 bg-[#2a2a2a] rounded-lg hover:bg-gray-700 transition-all mb-4"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-bold">{task.title}</h4>
                                <p className="text-gray-400">{task.description}</p>
                              </div>
                              <span className="text-gray-400">
                                <b>Due Date:</b> {formatDate(milestone.due_date) || "N/A"}
                              </span>
                            </div>
                            <div className="text-sm flex  justify-between gap-4">
                              <span
                                className={`capitalize w-[150px] px-4 py-3 rounded text-sm text-center font-bold ${milestone.priority === "high"
                                  ? "bg-red-500 text-white"
                                  : milestone.priority === "medium"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-green-500 text-white"
                                  }`}
                              >
                                {milestone.priority || "Low"}
                              </span>
                              <span
                                className={`capitalize w-[150px] px-4 py-3 rounded text-sm text-center font-bold ${milestone.status === "completed"
                                  ? "bg-green-500 text-white"
                                  : milestone.status === "in_progress"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-500 text-white"
                                  }`}
                              >
                                {milestone.status || "Pending"}
                              </span>
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
          <p className="mb-4 text-gray-400">No tasks found for any milestone.</p>
          <button
            onClick={() => console.log("Redirect to Create Goal")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Create a Task
          </button>
        </div>
      )}
    </div>
  );
};

export default TasksList;
