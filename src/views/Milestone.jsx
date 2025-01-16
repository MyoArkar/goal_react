import React from 'react'

export default function Milestone() {
    return (
        <div className='container min-h-screen bg-gray-800 text-slate-300'>
            <div className='w-[1000px] mx-auto p-10 flex flex-col gap-10'>
                <h1>Milestone</h1>
                <div className='w-full flex flex-row justify-between border-2 border-sky-500 text-slate-300 p-5 rounded-md shadow-sm hover:transition-transform
                '>
                    <div className='flex flex-col gap-3 text-sm'>
                        <h4 className='font-semibold text-white'>Complete Basic Language Tutorials</h4>
                        <p>Finished fundenmental concept including components</p>
                        <p>Completed on January 11, 2024</p>
                    </div>
                    <div>
                        <button className='bg-sky-500 px-3 py-1 rounded-md text-white hover:bg-sky-600 text-[10px]'>Completed</button>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between border-2 border-sky-500 text-slate-300 p-5 rounded-md shadow-sm'>
                    <div className='flex flex-col gap-3 text-sm'>
                        <h4 className='font-semibold text-white'> Build first project</h4>
                        <p>Finished fundenmental concept including components</p>
                        <p>Completed on January 11, 2024</p>
                    </div>
                    <div>
                        <button className='bg-yellow-600 px-3 py-1 rounded-md text-white hover:bg-sky-600 text-[10px]'>In Progress</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
