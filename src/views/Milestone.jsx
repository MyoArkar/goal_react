import React, { useEffect, useState } from 'react'
import axiosClient from '../axiosClient';
import { useNavigate } from 'react-router-dom';

function Item({ goal }) {
    const [milestones, setMilestones] = useState([]);
    const navigate = useNavigate();
    const handleDetail = (id) => {
        navigate(`/goals/${id}`);
    };
    const fetchMilestoneList = async () => {
        try {
            const { data } = await axiosClient.get(`/goals/${goal.id}/milestones`);
            setMilestones(data.data.milestones);
            console.log(data.message);
        } catch (error) {
            console.error("Error fetching MileStones:", error);
            alert("Failed to fetch MileStones. Please try again.");
        }
    };
    useEffect(() => {
        fetchMilestoneList();
    }, []);
    return <>
        {milestones.map((milestone) => (
            <div className='w-full flex flex-row justify-between border-2 border-sky-500 text-slate-900 p-5 rounded-md shadow-sm hover:transition-transform
            '>
                <h2>{goal.title}</h2>
                <div className='flex flex-col gap-3 text-sm'>
                    <h4 className='font-semibold text-slate-900'>{milestone.titl}</h4>
                    <p>{milestone.description}</p>
                    <p>{milestone.due_date}</p>
                </div>
                <div>
                    <button onClick={() => handleDetail(goal.id)} className='bg-sky-500 px-3 py-1 rounded-md text-slate-100 hover:bg-sky-600 text-[10px]'>Details</button>
                    <button className='bg-sky-500 px-3 py-1 rounded-md text-slate-100 hover:bg-sky-600 text-[10px]'>{milestone.status}</button>
                </div>
            </div>
        ))}

    </>
}

export default function Milestone() {
    const [goals, setGoals] = useState([]);

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
    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className='max-w-screen-inner px-10 py-5 mx-auto gap-10  flex flex-col min-h-screen'>
            <h1>Milestone</h1>
            {
                goals.map((goal) => (
                    <div>
                        
                        <Item goal={goal} />
                    </div>
                ))
            }
            <div className='w-full flex flex-row justify-between border-2 border-sky-500 text-slate-900 p-5 rounded-md shadow-sm hover:transition-transform
                '>
                <div className='flex flex-col gap-3 text-sm'>
                    <h4 className='font-semibold text-bodyText'>Complete Basic Language Tutorials</h4>
                    <p>Finished fundenmental concept including components</p>
                    <p>Completed on January 11, 2024</p>
                </div>
                <div>
                    <button className='bg-sky-500 px-3 py-1 rounded-md text-slate-100 hover:bg-sky-600 text-[10px]'>Completed</button>
                </div>
            </div>

        </div>
    )
}
