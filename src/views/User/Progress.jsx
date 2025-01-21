import React from 'react'

export default function Progress() {
    return (
        <div className='w-full px-10 py-5 mx-auto gap-5 flex flex-col min-h-screen'>
            <h1 className='text-sm font-semibold text-bodyText font-Poppins mb-5'>Progress Overview</h1>
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-4 place-content-center gap-5 text-sm text-bodyText">
                    <div className='flex flex-col gap-1 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md  text-bodyText text-[12px]  p-2 h-20 justify-center'>
                        <span className=''>Total Goals</span>
                        <p className='text-green-400 font-semibold text-[18px]'>5</p>
                        <p>Due: </p>
                    </div>
                    <div className='flex flex-col gap-1 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md text-bodyText text-[12px]  p-2 h-20 justify-center'>
                        <h5>Completed Tasks</h5>
                        <p className='text-green-400 font-semibold text-lg'>5</p>
                        <p>Due: </p>
                    </div>
                    <div className='flex flex-col gap-1 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md text-bodyText text-[12px]  p-2 h-20 justify-center'>
                        <h5>Active Milestone</h5>
                        <p className='text-green-400 font-semibold text-lg'>5</p>
                        <p>Due: </p>
                    </div>
                    <div className='flex flex-col gap-1 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md text-bodyText text-[12px]  p-2 h-20 justify-center'>
                        <h5>Achievement Rate</h5>
                        <p className='text-green-400 font-semibold text-lg'>5</p>
                        <p>Due: </p>
                    </div>
                </div>
                <div className="grid grid-cols-4 place-content-center gap-5 text-sm text-bodyText">
                    <div className='flex flex-col items-center gap-3 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md text-bodyText text-sm  p-3'>
                        <div>
                            <img src="../../assets/badge/b2.pngs" className='w-[50%]' alt="c" />
                        </div>

                        <p className='text-green-400 font-semibold text-lg'>5</p>
                        <p>Due: </p>
                    </div>
                    <div className='flex flex-col gap-3 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md text-bodyText text-sm  p-3'>
                        <h5>Completed Tasks</h5>
                        <p className='text-green-400 font-semibold text-lg'>5</p>
                        <p>Due: </p>
                    </div>
                    <div className='flex flex-col gap-3 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md text-bodyText text-sm  p-3'>
                        <h5>Active Milestone</h5>
                        <p className='text-green-400 font-semibold text-lg'>5</p>
                        <p>Due: </p>
                    </div>
                    <div className='flex flex-col gap-3 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md text-bodyText text-sm  p-3'>
                        <h5>Achievement Rate</h5>
                        <p className='text-green-400 font-semibold text-lg'>5</p>
                        <p>Due: </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 place-content-center gap-5 text-sm text-bodyText">
                    <div className='flex flex-col gap-3 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md  text-bodyText text-sm p-3'>
                        <h5 className='font-semibold text-[16px]'>Goal Progress</h5>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <h5>Learn React</h5>
                                <h5>80%</h5>
                            </div>
                            <div className=' relative w-full bg-gray-800 h-2 before:content[""] before:absolute before:w-36 before:h-2 before:bg-sky-500 before:rounded-md rounded-md'>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <h5>Learn Baking</h5>
                                <h5>50%</h5>
                            </div>
                            <div className=' relative w-full bg-gray-800 h-2 before:content[""] before:absolute before:w-20 before:h-2 before:bg-sky-500 before:rounded-md rounded-md'>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <h5>Read Books</h5>
                                <h5>20%</h5>
                            </div>
                            <div className=' relative w-full bg-gray-800 h-2 before:content[""] before:absolute before:w-14 before:h-2 before:bg-sky-500 before:rounded-md rounded-md'>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 bg-white/20  shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md  text-bodyText text-sm p-3'>
                        <h5 className='font-semibold text-[16px]'>Weekly Task</h5>
                        <div className='flex gap-3 items-center'>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">To do list</label>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">To do list</label>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">To do list</label>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">To do list</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
