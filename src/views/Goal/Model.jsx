import React, { useEffect, useRef } from 'react'
import { convertToISOString } from '../../utilities/dateFormater';
import axiosClient from '../../axiosClient';
import { convertToDateTime } from '../../utilities/dateFormater';

export default function Model({ visible, onClose, update, goal }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const priorityRef = useRef();
    const statusRef = useRef();

    useEffect(() => {
        if (update && goal) {
            titleRef.current.value = goal.title;
            descriptionRef.current.value = goal.description;
            startRef.current.value = convertToDateTime(goal.start_date); 
            endRef.current.value = convertToDateTime(goal.end_date);
            priorityRef.current.value = goal.priority;
            statusRef.current.value = goal.status;
        }
    }, [update, goal]);

    if (!visible) return null;

    const handleCreate = () => {
        const payload = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            start_date: startRef.current.value,
            end_date: endRef.current.value,
            priority: priorityRef.current.value,
            status: statusRef.current.value,
        };

        axiosClient.post("/goals", payload).then(() => {
            onClose();
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        });
        console.log(payload)
    };

    const handleUpdate = () => {
        const payload = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            start_date: convertToISOString(startRef.current.value),
            end_date: convertToISOString(endRef.current.value),
            priority: priorityRef.current.value,
            status: statusRef.current.value,
        };

        axiosClient.put(`/goals/${goal.id}`, payload).then(() => {
            onClose();
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
            <div className="w-[30rem] flex flex-col justify-center items-center text-slate-300 bg-[#0e0e0e] p-8 rounded-sm gap-5">
                <div className='w-full flex justify-end'>
                    <button onClick={onClose}>
                        <ion-icon size="large" name="close-circle-outline"></ion-icon>
                    </button>
                </div>
                <h3>{update ? 'Update Goal' : 'Create New Goal'}</h3>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Title</label>
                    <input  ref={titleRef} type="text" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Description</label>
                    <input ref={descriptionRef} type="text" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                </div>
                <div className="w-full flex flex-row justify-between gap-3">
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Start Date</label>
                        <input ref={startRef} type="datetime-local" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">End Date</label>
                        <input ref={endRef} type="datetime-local" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between gap-3">
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Priority</label>
                        <select ref={priorityRef} defaultValue="high" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm'>
                            <option value="high" selected>High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Status</label>
                        <select ref={statusRef} defaultValue="completed" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm'>
                            <option value="completed" selected>Complete</option>
                            <option value="in progress">In Progress</option>
                            <option value="pendings">Pending</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex flex-row-reverse gap-3">
                    <button onClick={onClose}
                        className='bg-gray-800 px-3 py-2 rounded'>Cancel</button>
                    
                    {update ? (
                        <button
                            className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'
                            onClick={handleUpdate} // Ensure this function is defined for updating
                        >
                            Update Goal
                        </button>
                    ) : (
                        <button
                            className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'
                            onClick={handleCreate} // Ensure this function is defined for creating
                        >
                            Create Goal
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
