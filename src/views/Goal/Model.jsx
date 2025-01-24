import React, { useEffect, useRef, useState } from 'react'
import { convertToISOString } from '../../utilities/dateFormater';
import axiosClient from '../../axiosClient';
import { convertToDateTime } from '../../utilities/dateFormater';

export default function Model({ visible, onClose, update, goal }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const priorityRef = useRef();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Only set values if modal is visible, update is true, and goal exists
        if (visible && update && goal && 
            titleRef.current && 
            descriptionRef.current && 
            startRef.current && 
            endRef.current && 
            priorityRef.current) {
            titleRef.current.value = goal.title || '';
            descriptionRef.current.value = goal.description || '';
            startRef.current.value = goal.start_date ? convertToDateTime(goal.start_date) : '';
            endRef.current.value = goal.end_date ? convertToDateTime(goal.end_date) : '';
            priorityRef.current.value = goal.priority;
        }
        // Clear errors when modal opens/closes
        setErrors({});
    }, [update, goal, visible]);

    if (!visible) return null;

    const handleCreate = () => {
        setErrors({});
        const payload = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            start_date: startRef.current.value,
            status: "in_progress",
            end_date: endRef.current.value,
            priority: priorityRef.current.value
        };

        axiosClient.post("/goals", payload).then(() => {
            onClose();
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        });
    };

    const handleUpdate = () => {
        setErrors({});
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
                setErrors(response.data.errors);
            }
        });
    };

    return (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="w-[32rem] flex flex-col justify-center items-center text-bodyText p-5 rounded-md gap-5 bg-white/50 backdrop-blur-3xl shadow-lg ring-1 ring-black/5 text-sm">
                <div className='flex justify-end w-full'>
                    <button onClick={onClose}>
                        <ion-icon size="small" name="close-circle-outline"></ion-icon>
                    </button>
                </div>
                <h3>{update ? 'Update Goal' : 'Create New Goal'}</h3>
                <div className='flex flex-col w-full'>
                    <label htmlFor="">Title</label>
                    <input ref={titleRef} type="text" name="" id="" className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.title ? 'ring-red-500' : 'ring-black/5'}`} />
                    {errors.title && <span className="mt-1 text-xs text-red-500">{errors.title[0]}</span>}
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="">Description</label>
                    <input ref={descriptionRef} type="text" name="" id="" className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.description ? 'ring-red-500' : 'ring-black/5'}`} />
                    {errors.description && <span className="mt-1 text-xs text-red-500">{errors.description[0]}</span>}
                </div>
                <div className="flex flex-row gap-2 justify-between w-full">
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="">Start Date</label>
                        <input ref={startRef} type="datetime-local" name="" id="" className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.start_date ? 'ring-red-500' : 'ring-black/5'}`} />
                        {errors.start_date && <span className="mt-1 text-xs text-red-500">{errors.start_date[0]}</span>}
                    </div>
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="">End Date</label>
                        <input ref={endRef} type="datetime-local" name="" id="" className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.end_date ? 'ring-red-500' : 'ring-black/5'}`} />
                        {errors.end_date && <span className="mt-1 text-xs text-red-500">{errors.end_date[0]}</span>}
                    </div>
                </div>
                <div className="flex flex-row gap-2 justify-between w-full">
                    <div className='flex flex-col w-1/2'>
                        <label htmlFor="">Priority</label>
                        <select ref={priorityRef} defaultValue="high" name="" id="" className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.priority ? 'ring-red-500' : 'ring-black/5'}`}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        {errors.priority && <span className="mt-1 text-xs text-red-500">{errors.priority[0]}</span>}
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-3 w-full">
                    <button onClick={onClose}
                        className='px-3 py-2 rounded-md ring-2 bg-white/40 ring-black/5 text-bodyText hover:bg-sidebar hover:text-defaultText'>Cancel</button>

                    {update ? (
                        <button
                            className='px-3 py-2 rounded-md ring-2 bg-white/40 ring-black/5 text-bodyText hover:bg-sidebar hover:text-defaultText'
                            onClick={handleUpdate} // Ensure this function is defined for updating
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            className='px-3 py-2 rounded-md ring-2 bg-white/40 ring-black/5 text-bodyText hover:bg-sidebar hover:text-defaultText'
                            onClick={handleCreate} // Ensure this function is defined for creating
                        >
                            Create
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
