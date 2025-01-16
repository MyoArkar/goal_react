import React from 'react'

export default function Model({ visible, onClose }) {
    const handleOnClose = () => {
        onClose()
    }
    if (!visible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10" onClick={handleOnClose}>
            <div className="w-[30rem] flex flex-col justify-center items-center text-slate-300 bg-gray-700 p-8 rounded-sm gap-5">
                <div className='w-full flex justify-end'>
                    <button onClick={onClose}>
                        <ion-icon size="large" name="close-circle-outline"></ion-icon>
                    </button>
                </div>
                <h3>Create New Goal</h3>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Title</label>
                    <input type="text" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                </div>
                <div className='w-full flex flex-col'>
                    <label htmlFor="">Description</label>
                    <input type="text" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                </div>
                <div className="w-full flex flex-row justify-between gap-3">
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Start Date</label>
                        <input type="date" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">End Date</label>
                        <input type="date" name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm' />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between gap-3">
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Priority</label>
                        <select name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm'>
                            <option value="" selected>High</option>
                            <option value="">Medium</option>
                            <option value="">Low</option>
                        </select>
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="">Status</label>
                        <select name="" id="" className='outline-none p-2 bg-gray-800 rounded-sm'>
                            <option value="" selected>Complete</option>
                            <option value="">In Process</option>
                            <option value="">Pending</option>
                        </select>
                    </div>
                </div>
                <div className="w-full flex flex-row-reverse gap-3">
                    <button className='bg-gray-800 px-3 py-2 rounded'>Cancel</button>
                    <button className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600' type='submit'>Create Goal</button>
                </div>
            </div>
        </div>
    )
}
