import React from 'react'
import { useState } from 'react'
import Model from './Model'
import { motion } from 'framer-motion';


export default function Goal() {
    const [active, setActive] = useState('All');
    const [showModel, setShowModel] = useState(false);
    const handleClose = () => setShowModel(false);
    return (
        <motion.div className='max-w-screen-inner px-10 py-5 mx-auto gap-10  flex flex-col min-h-screen'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Model visible={showModel} onClose={handleClose} />
            <div className="flex rounded-sm text-sm">
                <button className='bg-[#0e0e0e] px-3 py-2 rounded-sm text-white hover:bg-gray-800' onClick={() => setShowModel(true)}>Create Goal</button>
            </div>
            <div className='flex flex-row justify-center items-center w-full rounded-md'>
                <button className='bg-[#0e0e0e]  py-1.5 px-1.5 rounded-l-md'>
                    <ion-icon name="search-circle-outline" className="" style={{ color: 'white', fontSize: '25px' }}></ion-icon>
                </button>
                <input type="text" name="search" id="" className='w-full  py-2 px-1 rounded-r-md outline-none border-2 border-[#0e0e0e]   text-slate-900 flex' placeholder='Search goal...' />
            </div>
            <div className='w-full flex flex-row gap-8'>
                <button onClick={() => setActive('All')} className={`${active === 'All' ? 'border-2 border-sky-500  px-3 py-1 rounded-md' : ''}`}>All</button>
                <button onClick={() => setActive('Pending')} className={`${active === 'Pending' ? 'border-2 border-sky-500  px-3 py-1 rounded-md' : ''}`}>Pending</button>
                <button onClick={() => setActive('In Progress')} className={`${active === 'In Progress' ? 'border-2 border-sky-500  px-3 py-1 rounded-md' : ''}`}>In Progress</button>
                <button onClick={() => setActive('Complete')} className={`${active === 'Complete' ? 'border-2 border-sky-500  px-3 py-1 rounded-md' : ''}`}>Complete</button>
            </div>
            <div className="card flex flex-row gap-5 w-full">
                <div className="bg-[#0e0e0e] flex flex-col w-60 gap-5 rounded-md shadow-md p-5 text-sm text-slate-50">
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
                    <div className='flex flex-row justify-between'>
                        <button className='bg-sky-500 px-3 py-2 rounded-sm text-white hover:bg-sky-600'>Detail</button>
                    </div>
                </div >
                <div className="border-solid border-2 border-sky-500 flex flex-col w-60 gap-5 rounded-md shadow-md p-5 text-sm justify-center items-center">
                    <ion-icon name="add-circle-outline" size="large"></ion-icon>
                    <h5>Add New Goal</h5>
                </div >
            </div>
        </motion.div>
    )
}
