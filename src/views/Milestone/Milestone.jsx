import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import GoalAndMileston from "./GoalAndMilestone";
import { formatDate } from "../../utilities/dateFormater";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MilestoneModal from "../Goal/MilestoneModal";
import { useNavigate } from "react-router-dom";


const Milestone = () => {
    const [goals, setGoals] = useState([]);
    const [milestones, setMilestones] = useState({});
    const [loading, setLoading] = useState(true);
    //const [main, setMain] = useState(true);
    const [showModel, setShowModel] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedMile, setSelectedMile] = useState(null);
    //  const [activeMilestone, setActiveMilestone] = useState(null);
    const navigate = useNavigate();
    const fetchData = async () => {
        try {

            const goalsResponse = await axiosClient.get("/goals/");
            const goalsData = goalsResponse.data.data.data;


            const milestonesData = {};
            for (const goal of goalsData) {
                const milestonesResponse = await axiosClient.get(`/goals/${goal.id}/milestones`);
                milestonesData[goal.id] = milestonesResponse.data.data.milestones;
            }

            setGoals(goalsData);
            setMilestones(milestonesData);
        } catch (error) {
            console.error("Error fetching goals or milestones:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleDetail = (id) => {
        navigate(`/goals/${id}`);
    };
    const handleUpdateClick = (milestone) => {
        setUpdate(true);
        setSelectedMile(milestone);
        setShowModel(true);
        console.log(milestone)
    };
    const handleDelete = async (milestone) => {
        try {
            await axiosClient.delete(`/goals/${milestone.goal_id}/milestones/${milestone.id}`);
            console.log('MileStone deleted successfully');
            fetchData();
        } catch (error) {
            console.error("Error deleting Milestone:", error);
            alert("Failed to delete Milestone. Please try again.");
        }
    };
    const confirmDelete = (milestoneId) => {
        const confirmed = window.confirm("Are you sure you want to delete this milestone?");
        if (confirmed) {
            handleDelete(milestoneId);
        }
    };
    const handleClose = () => {
        setShowModel(false);
        fetchData();
    };
    const handleStatus = async (milestone) => {
        if (milestone.status == "pending") {
            const payload = {
                status: "in_progress",
            };

            axiosClient.put(`/goals/${milestone.goal_id}/milestones/${milestone.id}`, payload).then(() => {
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
                progress_percentage: 100
            };

            axiosClient.put(`/goals/${milestone.goal_id}/milestones/${milestone.id}`, payload).then(() => {
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

            axiosClient.put(`/goals/${milestone.goal_id}/milestones/${milestone.id}`, payload).then(() => {
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


    const hasMilestones = Object.values(milestones).some((m) => m.length > 0);

    return (
        <div className="w-full px-10 py-5 mx-auto flex flex-col min-h-screen">

            {selectedMile && (<MilestoneModal
                goalId={selectedMile.goal_id}
                visible={showModel}
                onClose={handleClose}
                update={true}
                milestone={selectedMile} />)}
            {hasMilestones ? (

                goals.map(
                    (goal) =>
                        milestones[goal.id]?.length > 0 && (
                            <div key={goal.id} className=" flex flex-col items-center">
                                <ul className="list-none  rounded-md w-[80%]  ">
                                    {milestones[goal.id].map((milestone) => (
                                        <li
                                            key={milestone.id}
                                            className="bg-white/10 ring-1 ring-black/5 text-sm  rounded-md  shadow-lg grid grid-cols-3 place-content-center px-5 py-4 mb-5 relative
                                            "
                                        >
                                            <div className=" flex flex-col justify-center items-start text-slate-700 gap-3">
                                                <h3 className="text-sm font-semibold">{milestone.title}</h3>
                                                <p className="w-2/3 h-[60px] overflow-scroll no-scrollbar">{milestone.description || "No description provided."} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas odio facere autem eligendi dolores adipisci perferendis voluptatum debitis velit sapiente quo est, consequatur, necessitatibus vero nostrum laudantium. Quod, ratione delectus?</p>
                                                <div className=" flex gap-3 items-center text-sm font-semibold">
                                                    <b className="">Task Count</b>
                                                    <p className="">{milestone.task_count}</p>
                                                </div>
                                                <span className="">
                                                    <b>Due Date:</b> {formatDate(milestone.due_date) || "N/A"}
                                                </span>
                                            </div>
                                            {/* 2sec */}
                                            <div className="text-sm flex flex-col justify-center items-center gap-4 ">
                                                <span
                                                    className={`capitalize w-[150px] px-4 py-3 rounded text-sm text-center  ${milestone.priority === "high"
                                                        ? "bg-red-500 text-white"
                                                        : milestone.priority === "medium"
                                                            ? "bg-yellow-500 text-black"
                                                            : "bg-green-500 text-white"
                                                        }`}
                                                >
                                                    {milestone.priority || "Low"}
                                                </span>
                                                <div>
                                                    {(milestone.task_count > 0 && milestone.status != 'completed') && (
                                                        <button
                                                            onClick={() => handleDetail(milestone.goal_id)}
                                                            className="capitalize w-[150px] px-4 py-3 rounded text-sm text-center bg-purple-500 hover:bg-purple-600"
                                                        >
                                                            In Progress
                                                        </button>
                                                    )}
                                                    {(milestone.task_count > 0 && milestone.status == 'completed') && (
                                                        <button
                                                            onClick={() => handleDetail(milestone.goal_id)}
                                                            className="capitalize w-[150px] px-4 py-3 rounded text-sm text-center font-bold bg-purple-500 hover:bg-purple-600"
                                                        >
                                                            Completed
                                                        </button>
                                                    )}
                                                    {milestone.task_count == 0 && (
                                                        <button
                                                            onClick={() => handleStatus(milestone)}
                                                            className={`capitalize w-[150px] px-4 py-3 rounded text-sm text-center font-bold ${milestone.status === "in_progress"
                                                                ? "bg-blue-500 hover:bg-blue-600"
                                                                : "bg-green-500 hover:bg-green-600"
                                                                }`}
                                                        >
                                                            {milestone.status === "in_progress" && <b>In Progress</b>}
                                                            {milestone.status === "completed" && <b>Completed</b>}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {/* 3rd sec */}

                                            <div className=" text-center text-2xl  flex items-center justify-center">
                                                <div className="w-[100px] h-[100px]">
                                                    <CircularProgressbar value={milestone.progress_percentage} text={`${milestone.progress_percentage}%`} styles={buildStyles({
                                                        pathColor: "#fcd34d",
                                                        textColor: "#fcd34d",
                                                        textSize: "18px",
                                                    })} />
                                                </div>
                                            </div>
                                            <div className="group flex justify-center items-center absolute top-3 right-3">
                                                <span className="cursor-pointer">
                                                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                </span>
                                                <div className="absolute z-30  p-2 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <span
                                                        onClick={() => handleUpdateClick(milestone)}
                                                        className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700 mb-1"
                                                    >
                                                        <ion-icon name="cloud-upload-outline" className="mr-1"></ion-icon> Update
                                                    </span>
                                                    <span
                                                        onClick={() => confirmDelete(milestone)}
                                                        className="flex items-center cursor-pointer text-red-500 hover:text-red-700"
                                                    >
                                                        <ion-icon name="trash-outline" className="mr-1"></ion-icon> Delete
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                )
            ) : (
                // Display "Create a Goal" button if no milestones exist
                <div className="text-center">
                    <GoalAndMileston goals={goals} />
                </div>
            )}
        </div>
    );
};

export default Milestone;
