import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Model from './Model';
import axiosClient from '../../axiosClient';
import { formatDate } from '../../utilities/dateFormater';
import { MdManageSearch } from "react-icons/md";

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
        <div className='max-w-screen-inner px-10 py-5 mx-auto gap-10  flex flex-col min-h-screen'
        >
            <Model
                visible={showModel}
                onClose={handleClose}
                update={update}
                goal={selectedGoal}
            />
            <div className="flex rounded-sm text-sm">
                <button className='bg-[#0e0e0e] px-3 py-2 rounded-md text-white hover:bg-gray-800' onClick={() => setShowModel(true)}>Create Goal</button>
            </div>
            <div className='flex flex-row justify-center items-center w-full rounded-md'>
                <button className='bg-[#0e0e0e]  py-2 px-2 rounded-l-md'>
                    <MdManageSearch size={26}
                        className="cursor-pointer text-white" />
                </button>
                <input
                    type="text"
                    name="search"
                    className='w-full  py-2 px-1 rounded-r-md outline-none border-2   text-slate-900 flex border-gray-300' placeholder='Search'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className='w-full flex flex-row gap-8'>

                {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setActive(status)}
                        className={`${active === status ? 'border-2 border-[#0e0e0e]  px-3 py-1 rounded-md' : ''}`}
                    >
                        {status}
                    </button>
                ))}
            </div>
            <div className="card flex flex-row gap-5 w-full">
                <div onClick={handleCreateClick}
                    className="border-solid border-2 border-[#0e0e0e] flex flex-col w-60 gap-5 rounded-md shadow-md p-5 text-sm justify-center items-center">
                    <ion-icon name="add-circle-outline" size="large"></ion-icon>
                    <h5>Add New Goal</h5>
                </div >
                {filteredGoals.map((goal) => (
                    <div key={goal.id} className="bg-[#0e0e0e] flex flex-col w-60 gap-5 rounded-md shadow-md p-5 text-sm text-slate-50">
                        <div className='flex justify-between items-center'>
                            <h2>{goal.title}</h2>
                            <span onClick={() => handleUpdateClick(goal)} ><ion-icon name="cloud-upload-outline"></ion-icon></span>
                            <span onClick={() => { handleDelete(goal.id) }} > <ion-icon name="trash-outline"></ion-icon></span>
                        </div>
                        <p className="">{goal.description}</p>
                        <div className='flex flex-row justify-between '>
                            <div className="flex flex-col">
                                <h5 className='text-slate-500'>Start Date</h5>
                                <p className='pr-3'>{formatDate(goal.start_date)}</p>
                            </div>
                            <div className="flex flex-col">
                                <h5 className='text-slate-500'>End Date</h5>
                                <p className='pr-3'>{formatDate(goal.end_date)}</p>
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
                            <button
                                onClick={() => handleDetail(goal.id)}
                                className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'>
                                Detail
                            </button>
                        </div>
                    </div>

                ))}

            </div >
        </div>
    )
}
