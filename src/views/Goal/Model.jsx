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

    useEffect(() => {
        if (update && goal) {
            titleRef.current.value = goal.title;
            descriptionRef.current.value = goal.description;
            startRef.current.value = convertToDateTime(goal.start_date);
            endRef.current.value = convertToDateTime(goal.end_date);
            priorityRef.current.value = goal.priority;
        }
    }, [update, goal]);

    if (!visible) return null;

    const handleCreate = () => {
        const payload = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            start_date: startRef.current.value,
            end_date: endRef.current.value,
            priority: priorityRef.current.value
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
            <div className="w-[32rem] flex flex-col justify-center items-center text-bodyText p-5 rounded-md gap-5 bg-white/50 backdrop-blur-3xl shadow-lg ring-1 ring-black/5 text-sm">
                <div className='w-full flex justify-end'>
                    <button onClick={onClose}>
                        <ion-icon size="small" name="close-circle-outline"></ion-icon>
                    </button>
                </div>
                <h3>{update ? 'Update Goal' : 'Create New Goal'}</h3>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Title</label>
                    <input ref={titleRef} type="text" name="" id="" className='outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ring-black/5' />
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Description</label>
                    <input ref={descriptionRef} type="text" name="" id="" className='outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ring-black/5' />
                </div>
                <div className="w-full flex flex-row justify-between gap-2">
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Start Date</label>
                        <input ref={startRef} type="datetime-local" name="" id="" className='outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ring-black/5' />
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">End Date</label>
                        <input ref={endRef} type="datetime-local" name="" id="" className='outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ring-black/5' />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between gap-2">
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Priority</label>
                        <select ref={priorityRef} defaultValue="high" name="" id="" className='outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ring-black/5'>
                            <option value="high" selected>High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex flex-row-reverse gap-3">
                    <button onClick={onClose}
                        className='bg-white/40 ring-2 ring-black/5 px-3 py-2 rounded-md text-bodyText hover:bg-sidebar hover:text-defaultText'>Cancel</button>

                    {update ? (
                        <button
                            className='bg-white/40 ring-2 ring-black/5 px-3 py-2 rounded-md text-bodyText hover:bg-sidebar hover:text-defaultText'
                            onClick={handleUpdate} // Ensure this function is defined for updating
                        >
                            Update Goal
                        </button>
                    ) : (
                        <button
                            className='bg-white/40 ring-2 ring-black/5 px-3 py-2 rounded-md text-bodyText hover:bg-sidebar hover:text-defaultText'
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
