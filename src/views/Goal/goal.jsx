import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Model from './Model';
import axiosClient from '../../axiosClient';
import { formatDate } from '../../utilities/dateFormater';
import { MdManageSearch } from "react-icons/md";
import { BsPlusCircleDotted } from "react-icons/bs";
import { motion } from 'framer-motion';
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
    const handleStatus = async (goal) => {
        if (goal.status == "pending" && goal.milestone_count == 0) {
            const payload = {
                status: "completed"
            };
            axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
                console.log('hello')
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        }
        if (goal.status == "completed" && goal.milestone_count == 0) {
            const payload = {
                status: "pending"
            };
            axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
                console.log('Status Updated')
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        }
        if (goal.status == "in progress") {
            const payload = {
                status: "completed"
            };
            axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
                console.log('Status Updated')
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        }
        if (goal.status == "completed") {
            const payload = {
                status: "in progress"
            };
            axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
                console.log('Status Updated')
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
        <div className='w-full px-10 py-5 mx-auto gap-10  flex flex-col min-h-screen'
        >
            <Model
                visible={showModel}
                onClose={handleClose}
                update={update}
                goal={selectedGoal}
            />
            <div className="flex justify-between items-center text-sm">
                <motion.button whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.7 }} className='bg-transparent ring-2 ring-black/5 shadow-md px-3 py-2 rounded-md text-bodyText hover:bg-sidebar hover:text-defaultText' onClick={() => setShowModel(true)}>Create Goal</motion.button>
                <motion.div whileHover={{ scale: 1.05 }} className='flex flex-row justify-center items-center w-96 rounded-md border border-gray-300 shadow-md'>
                    <button className='bg-transparent py-2 px-2 rounded-l-md ring-1 ring-black/5'>
                        <MdManageSearch size={26}
                            className="cursor-pointer text-bodyText" />
                    </button>
                    <input
                        type="text"
                        name="search"
                        className='w-full  py-2 px-1 rounded-r-md outline-none   text-slate-900 flex' placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </motion.div>
            </div>

            <div className='w-full flex flex-row gap-8'>

                {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
                    <motion.button whileTap={{ scale: 0.5 }}
                        key={status}
                        onClick={() => setActive(status)}
                        className={`${active === status ? 'border-2 border-sidebar  px-3 py-1 rounded-md text-sm' : ''}`}
                    >
                        {status}
                    </motion.button>
                ))}
            </div>
            <div className="card flex flex-row gap-5 w-full">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.7 }} onClick={handleCreateClick}
                    className="flex flex-col w-60 gap-5 rounded-md p-5 text-sm justify-center items-center bg-white/10 shadow-lg ring-1 ring-black/5">
                    <BsPlusCircleDotted size={26}
                        className="cursor-pointer" />
                    <h5>Add New Goal</h5>
                </motion.div >
                {filteredGoals.map((goal) => (
                    <motion.div whileHover={{ scale: 1.05 }} key={goal.id} className="bg-white/10  flex flex-col w-1/2 gap-8 rounded-md p-5 text-sm text-bodyText shadow-lg ring-1 ring-black/5">
                        <div className='flex justify-between items-center'>
                            <h2>{goal.title}</h2>
                            <span onClick={() => handleUpdateClick(goal)} ><ion-icon name="cloud-upload-outline"></ion-icon></span>
                            <span onClick={() => { handleDelete(goal.id) }} > <ion-icon name="trash-outline"></ion-icon></span>
                        </div>
                        <p className="">{goal.description}</p>
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col">
                                <h5 className='text-slate-500'>Start Date</h5>
                                <p className=''>{formatDate(goal.start_date)}</p>
                            </div>
                            <div className="flex flex-col">
                                <h5 className='text-slate-500 text-right'>End Date</h5>
                                <p className=''>{formatDate(goal.end_date)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <h5>Progress</h5>
                                <h5>{goal.progress_percentage}%</h5>
                            </div>
                            <div className='relative w-full bg-black h-1'>
                                <div style={{ width: `${goal.progress_percentage}%` }} className='absolute h-1 bg-sky-500'></div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <motion.button whileHover={{ scale: 1.1 }}
                                onClick={() => handleDetail(goal.id)}
                                className='bg-sky-500 px-3 py-1 rounded-md text-white hover:bg-sky-600'>
                                Detail
                            </motion.button>
                            {
                                goal.status == 0 && (
                                    <button
                                        onClick={() => handleStatus(goal)}
                                        className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'>
                                        {goal.status == "pending" && (<b>Start</b>)}
                                        {goal.status == "in_progress" && (<b>In Progress</b>)}
                                        {goal.status == "completed" && (<b>Completed</b>)}
                                    </button>
                                )
                            }

                        </div>
                    </motion.div>

                ))}

            </div >
        </div>
    )
}
