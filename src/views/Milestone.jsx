import React from 'react'

export default function Milestone() {
    return (
        <div className='max-w-screen-inner px-10 py-5 mx-auto gap-10  flex flex-col min-h-screen'>
            <h1>Milestone</h1>
            <div className='w-full flex flex-row justify-between border-2 border-sky-500 text-bodyText p-5 rounded-md shadow-sm hover:transition-transform
                '>
                <div className='flex flex-col gap-3 text-sm'>
                    <h4 className='font-semibold text-bodyText'>Complete Basic Language Tutorials</h4>
                    <p>Finished fundenmental concept including components</p>
                    <p>Completed on January 11, 2024</p>
                </div>
                <div>
                    <button className='bg-sky-500 px-3 py-1 rounded-md text-slate-100 hover:bg-sky-600 text-[10px]'>Completed</button>
                </div>
            </div>
            <div className='w-full flex flex-row justify-between border-2 border-sky-500 text-bodyText p-5 rounded-md shadow-sm'>
                <div className='flex flex-col gap-3 text-sm'>
                    <h4 className='font-semibold text-bodyText'> Build first project</h4>
                    <p>Finished fundenmental concept including components</p>
                    <p>Completed on January 11, 2024</p>
                </div>
                <div>
                    <button className='bg-yellow-600  px-3 py-1 rounded-md text-slate-100 hover:bg-sky-600 text-[10px]'>In Progress</button>
                </div>
            </div>
        </div>
    )
}
