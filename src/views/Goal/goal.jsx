import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Model from './Model';

export default function Goal() {
    const [active, setActive] = useState('All');
    const [showModel, setShowModel] = useState(false);

    const handleClose = () => setShowModel(false);
    return (
        <div className='container min-h-screen bg-gray-800 text-slate-300'>
            <Model visible={showModel} onClose={handleClose} />
            <div className='w-[1000px] mx-auto p-10 flex flex-col gap-10'>
                <div className="flex w-full rounded-sm text-sm">
                    <button className='bg-sky-500 px-3 py-2 rounded-md text-white hover:bg-sky-600' onClick={() => setShowModel(true)}>Create Goal</button>
                </div>
                <div className='flex flex-row justify-center w-full rounded-md item border-2 border-sky-500 '>
                    <button className='bg-gray-800 pt-1 pl-3 rounded-l-md'>
                        <ion-icon name="search-circle-outline" className="" style={{ color: 'white', fontSize: '25px' }}></ion-icon>
                    </button>
                    <input type="text" name="search" id="" className='w-full bg-gray-800 py-2 px-1 rounded-r-md outline-none text-slate-300 flex' placeholder='Search goal...' />
                </div>
                <div className='w-full flex flex-row gap-8'>
                    <button onClick={() => setActive('All')} className={`${active === 'All' ? 'border-b-2 border-sky-500 bg-gray-700 px-3 py-1 rounded-md' : ''}`}>All</button>
                    <button onClick={() => setActive('Pending')} className={`${active === 'Pending' ? 'border-b-2 border-sky-500 bg-gray-700 px-3 py-1 rounded-md' : ''}`}>Pending</button>
                    <button onClick={() => setActive('In Progress')} className={`${active === 'In Progress' ? 'border-b-2 border-sky-500 bg-gray-700 px-3 py-1 rounded-md' : ''}`}>In Progress</button>
                    <button onClick={() => setActive('Complete')} className={`${active === 'Complete' ? 'border-b-2 border-sky-500 bg-gray-700 px-3 py-1 rounded-md' : ''}`}>Complete</button>
                </div>
                <div className="card flex flex-row gap-5">
                    < div div className="border-solid border-2 border-sky-500 flex flex-col w-60 gap-5 rounded-md shadow-md p-5 text-sm">
                        <h2>Goal</h2>
                        <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel quae molestiae tempore earum doloribus, similique at quia aut</p>
                        <div className='flex flex-row justify-between '>
                            <div className="flex flex-col">
                                <h5 className='text-slate-500'>Start Date</h5>
                                <p>202/1/10</p>
                            </div>
                            <div className="flex flex-col">
                                <h5 className='text-slate-500'>End Date</h5>
                                <p>2025/1/10</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <h5>Progress</h5>
                                <h5>80%</h5>
                            </div>
                            <div className=' relative w-full bg-black h-1 before:content[""] before:absolute before:w-40 before:h-1 before:bg-sky-500'>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between
                       '>
                            <button className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'>Detail</button>
                        </div>
                    </div >
                    < div div className="border-solid border-2 border-sky-500 flex flex-col w-60 gap-5 rounded-md shadow-md p-5 text-sm justify-center items-center">
                        <ion-icon name="add-circle-outline" size="large"></ion-icon>
                        <h5>Add New Goal</h5>
                    </div >
                </div>
            </div>
        </div >
    )
}
