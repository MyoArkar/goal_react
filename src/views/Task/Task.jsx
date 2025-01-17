import React from 'react'
import { useState } from 'react'
import Model from '../Goal/Model'

export default function Task() {
    const [showModel, setShowModel] = useState(false);
    const handleClose = () => setShowModel(false);

    return (
        <div className='w-[1100px]  p-10 flex flex-col gap-10'>
            <Model visible={showModel} onClose={handleClose} />
            <div className="flex w-full rounded-sm text-sm">
                <button className='bg-[#0e0e0e] px-3 py-2 rounded-sm text-white hover:bg-gray-800' onClick={() => setShowModel(true)}>Create Task</button>
            </div>
            <div className="w-full grid grid-cols-3 place-content-center gap-5 text-sm text-slate-900">
                <div className='flex flex-col gap-3'>
                    <h5 className='font-semibold'>To Do</h5>
                    <div className='flex flex-row border-2 border-sky-500 rounded-md shadow-md px-5 py-5 gap-3'>
                        <div className=''>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-semibold'>Study React Hooks</label>
                            <p>Learn useEffect and custom hooks</p>
                            <div className='flex gap-3 items-center mt-1'>
                                <button className="px-3 bg-blue-500 text-white rounded-md text-[12px]">React</button>
                                <p>Due: Tomorrow</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h5 className='font-semibold'>In Progress</h5>
                    <div className='flex flex-row border-2 border-sky-500 rounded-md shadow-md px-5 py-5 gap-3'>
                        <div className=''>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-semibold'>Study React Hooks</label>
                            <p>Learn useEffect and custom hooks</p>
                            <div className='flex gap-3 items-center mt-1'>
                                <button className="px-3 text-inherit bg-teal-500 text-white rounded-md text-[12px]">React</button>
                                <p>Due: Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h5 className='font-semibold'>Completed</h5>
                    <div className='flex flex-row border-2 border-sky-500 rounded-md shadow-md px-5 py-5 gap-3'>
                        <div className=''>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='font-semibold'>Study React Hooks</label>
                            <p>Learn useEffect and custom hooks</p>
                            <div className='flex gap-3 items-center mt-1'>
                                <button className="px-3 text-inherit bg-amber-500 text-white rounded-md text-[12px]">React</button>
                                <p>Due: Next Week</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
