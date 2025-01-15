import React from 'react'

export default function Goal() {
    return (
        <div className='w-full bg-gray-800 text-white'>
            <div className='p-5 w-56 bg-slate-500'>
                <h2>Goal</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel quae molestiae tempore earum doloribus, similique at quia aut amet non, ratione, dignissimos quaerat laborum excepturi consequatur laboriosam suscipit unde possimus.</p>
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
            </div>
        </div>
    )
}
