import React, { useRef } from 'react'
import { convertToISOString } from '../../utilities/dateFormater';
import axiosClient from '../../axiosClient';

export default function Model({ visible, onClose }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const priorityRef = useRef();
    const statusRef = useRef();

   
    if (!visible) return null;

    
    const Create = () => {

        const payload = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            start_date: convertToISOString(startRef.current.value),
            end_date: convertToISOString(endRef.current.value),
            priority: priorityRef.current.value,
            status: statusRef.current.value,
        }
        axiosClient.post("/goals", payload).then(() => {
            onClose();
            
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        });

    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
            <div className="w-[30rem] flex flex-col justify-center items-center text-slate-300 bg-gray-700 p-8 rounded-sm gap-5">
                <div className='w-full flex justify-end'>
                    <button onClick={onClose}>
                        <ion-icon size="large" name="close-circle-outline"></ion-icon>
                    </button>
                </div>
                <h3>Create New Goal</h3>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Title</label>
                    <input ref={titleRef}
                        type="text" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Description</label>
                    <input ref={descriptionRef}
                        type="text" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                </div>
                <div className="w-full flex flex-row justify-between gap-3">
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Start Date</label>
                        <input ref={startRef}
                            type="datetime-local" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">End Date</label>
                        <input ref={endRef}
                            type="datetime-local" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between gap-3">
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="">Priority</label>
                        <select ref={priorityRef} defaultValue="high" className="outline-none p-2 bg-gray-800 rounded-sm">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <label htmlFor="">Status</label>
                        <select ref={statusRef} defaultValue="completed" className="outline-none p-2 bg-gray-800 rounded-sm">
                            <option value="completed">Complete</option>
                            <option value="in progress">In Progress</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex flex-row-reverse gap-3">
                    <button className='bg-gray-800 px-3 py-2 rounded' onClick={onClose}>Cancel</button>
                    <button className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600' type='submit' onClick={Create}>Create Goal</button>
                </div>
            </div>
        </div>
    )
}