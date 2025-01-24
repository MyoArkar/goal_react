import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Model from './Model';
import axiosClient from '../../axiosClient';
import { formatDate } from '../../utilities/dateFormater';
import { MdManageSearch } from "react-icons/md";
import { BsPlusCircleDotted } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { easeIn, easeInOut, motion } from 'framer-motion';
import { duration } from '@mui/material';
export default function Goal() {
    const [goals, setGoals] = useState([]);
    const [active, setActive] = useState('All');
    const [showModel, setShowModel] = useState(false);
    const [update, setUpdate] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const fetchGoals = async () => {
        try {
            const { data } = await axiosClient.get("/goals");
            setGoals(data.data.data);
            console.log("Fetched Goals:", data.data.data);
        } catch (error) {
            console.error("Error fetching goals:", error);
            alert("Failed to fetch goals. Please try again.");
        }
    };

    const handleUpdateClick = (goal) => {
        setUpdate(true);
        setSelectedGoal(goal); // Set the selected goal for update
        setShowModel(true);
    };
    const handleCreateClick = () => {
        setUpdate(false);
        setShowModel(true);
    };
    const handleClose = () => {
        setShowModel(false);
        fetchGoals();
    };

    const handleDetail = (id) => {
        navigate(`/goals/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/goals/${id}`);
            console.log('Goal deleted successfully');
            fetchGoals();
        } catch (error) {
            console.error("Error deleting goals:", error);
            alert("Failed to delete goal. Please try again.");
        }
    };
    const confirmDelete = (goalId) => {
        const confirmed = window.confirm("Are you sure you want to delete this goal?");
        if (confirmed) {
            handleDelete(goalId); // Call your delete function here
        }
    };
    const handleStatus = async (goal) => {
        if (goal.status == "pending") {
            const payload = {
                status: "in_progress"
            };
            axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
                console.log('Status Updated')
                fetchGoals();
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        }
        if (goal.status == "in_progress") {
            const payload = {
                status: "completed",
                progress_percentage: 100
            };
            axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
                console.log('Status Updated')
                fetchGoals();
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        }
        if (goal.status == "completed") {
            const payload = {
                status: "in_progress",
                progress_percentage: 0
            };
            axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
                console.log('Status Updated')
                fetchGoals();
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        }
        fetchGoals();
    }
    useEffect(() => {
        fetchGoals();
    }, []);

    const filterGoals = () => {
        let filtered = goals;

        // Filter by active status
        if (active !== 'All') {
            filtered = filtered.filter((goal) => goal.status?.toLowerCase() === active.toLowerCase());
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((goal) =>
                goal.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };
    const filteredGoals = filterGoals();
    return (
        <div className='flex flex-col gap-10 px-10 py-5 mx-auto w-full min-h-screen'
        >
            <Model
                visible={showModel}
                onClose={handleClose}
                update={update}
                goal={selectedGoal}
            />
            <div className="flex gap-3 justify-between items-center text-sm">
                <motion.button whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.7 }} className='w-full sm:w-60 md:w-80 lg:w-96 bg-transparent ring-2 ring-black/5 shadow-md px-3 py-[11px] rounded-md text-bodyText hover:bg-sidebar hover:text-defaultText' onClick={() => setShowModel(true)}>Create Goal</motion.button>
                <motion.div whileHover={{ scale: 1.05 }} className='flex overflow-hidden flex-row justify-center items-center w-full bg-transparent rounded-md ring-2 shadow-md ring-black/5'>
                    <button className='px-2 py-2 bg-transparent rounded-l-md ring-1 ring-black/5'>
                        <MdManageSearch size={26}
                            className="cursor-pointer text-bodyText" />
                    </button>
                    <input
                        type="text"
                        name="search"
                        className='flex px-1 py-2 w-full rounded-r-md outline-none text-slate-900' placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </motion.div>
            </div>
            <div className='grid grid-cols-2 gap-3 w-full text-sm lg:grid-cols-4 lg:gap-5'>
                {['All', 'In_Progress', 'Completed'].map((status) => (
                    <motion.button whileTap={{ scale: 0.5 }} whileHover={{ scale: 1.08 }}
                        key={status}
                        onClick={() => setActive(status)}
                        className={`${active === status ? 'border-2 border-sidebar  px-3 py-1 rounded-md text-sm' : ''}`}
                    >
                        {status}
                    </motion.button>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-5 place-content-center w-full card sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredGoals.map((goal) => (
                    <motion.div whileHover={{ scale: 1.05 }} key={goal.id} className="flex flex-col gap-5 p-5 text-sm rounded-md ring-1 shadow-lg bg-white/10 text-bodyText ring-black/5">
                        <div className='flex justify-between items-center'>
                            <h2>{goal.title}</h2>
                            <div className="relative group">
                                <span className="cursor-pointer">
                                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                </span>
                                <div className="absolute right-0 p-2 mt-2 bg-white rounded border shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <span
                                        onClick={() => handleUpdateClick(goal)}
                                        className="flex items-center mb-1 text-blue-500 cursor-pointer hover:text-blue-700"
                                    >
                                        <ion-icon name="cloud-upload-outline" className="mr-1"></ion-icon> Update
                                    </span>
                                    <span
                                        onClick={() => confirmDelete(goal.id)}
                                        className="flex items-center text-red-500 cursor-pointer hover:text-red-700"
                                    >
                                        <ion-icon name="trash-outline" className="mr-1"></ion-icon> Delete
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="">{goal.description}</p>
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col">
                                <h5 className='text-slate-500'>Start Date</h5>
                                <p className=''>{formatDate(goal.start_date)}</p>
                            </div>
                            <div className="flex flex-col">
                                <h5 className='text-right text-slate-500'>End Date</h5>
                                <p className='text-right'>{formatDate(goal.end_date)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <h5>Progress</h5>
                                <h5>{goal.progress_percentage}%</h5>
                            </div>
                            <div className='relative w-full h-1 bg-black'>
                                <div style={{ width: `${goal.progress_percentage}%` }} className='absolute h-1 bg-sky-500'></div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <motion.button whileHover={{ scale: 1.1 }}
                                onClick={() => handleDetail(goal.id)}
                                className='px-3 py-1 text-white bg-sky-500 rounded-md hover:bg-sky-600'>
                                Detail
                            </motion.button>
                            {(goal.milestone_count > 0 && goal.status != 'completed') && (
                                <button
                                    onClick={() => handleDetail(goal.id)}
                                    className="flex justify-center items-center w-32 h-12 font-bold text-white bg-blue-500 rounded-lg shadow-md transition-all duration-200 hover:bg-blue-600"
                                >
                                    In Progress
                                </button>
                            )}
                            {(goal.milestone_count > 0 && goal.status == 'completed') && (
                                <button
                                    onClick={() => handleDetail(goal.id)}
                                    className="flex justify-center items-center w-32 h-12 font-bold text-white bg-green-500 rounded-lg shadow-md transition-all duration-200 hover:bg-green-600"
                                >
                                    Completed
                                </button>
                            )}
                            {goal.milestone_count == 0 && (
                                <button
                                onClick={() => handleStatus(goal)}
                                className={`w-32 h-12 rounded-lg font-bold text-white shadow-md transition-all duration-200 flex items-center justify-center ${
                                    goal.status === "in_progress" && "bg-blue-500 hover:bg-blue-600"
                                } ${
                                    goal.status === "pending" && "bg-blue-500 hover:bg-blue-600"
                                } ${
                                    goal.status === "completed" && "bg-green-500 hover:bg-green-600"
                                }`}
                                >   
                                    { goal.status === "in_progress" && <b>In Progress</b>}
                                    {goal.status === "completed" && <b>Completed</b>}
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} onClick={handleCreateClick}
                    className="flex flex-col gap-5 justify-center items-center p-5 text-sm rounded-md ring-1 shadow-lg bg-white/10 ring-black/5">
                    <BsPlusCircleDotted size={26}
                        className="cursor-pointer" />
                    <h5>Add New Goal</h5>
                </motion.div >
            </div >
        </div>
    )
}
