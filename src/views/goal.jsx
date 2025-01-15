import React from 'react'

export default function Goal() {
    return (
        <div className='container min-h-screen bg-gray-800 text-white'>
            <div className='w-[1000px] mx-auto p-10 flex flex-col gap-10'>
                <div className="flex flex-row justify-between ">
                    <h3>Goal</h3>
                    <button className='bg-sky-500 rounded-md p-2 text-sm shadow-sm hover:bg-sky-900'>Create Goal</button>
                </div>
                <div className='flex justify-center w-full bg-slate-500
            '>
                    <input type="text" name="search" id="" className='w-full rounded-sm' />
                </div>
                <div className="card flex flex-row">
                    < div div className="border-solid border-2 border-sky-500 flex flex-col w-56 gap-3 rounded-md shadow-md p-5 text-sm">
                        <h2>Goal</h2>
                        <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel quae molestiae tempore earum doloribus, similique at quia aut</p>
                        <div className='flex flex-row justify-between'>
                            <div className="flex flex-col">
                                <h5>Start Date</h5>
                                <p>202/1/10</p>
                            </div>
                            <div className="flex flex-col">
                                <h5>End Date</h5>
                                <p>2025/1/10</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between">
                                <h5>Progress</h5>
                                <h5>80%</h5>
                            </div>
                            <div className='w-full bg-black before:content[""]'>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div >
    )
}
