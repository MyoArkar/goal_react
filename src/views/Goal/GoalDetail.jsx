import React, { useState } from 'react'

export default function GoalDetail() {
  return <>
    <div className='container text-slate-300 px-10 py-10'>
      <div className='bg-black px-10 py-3 rounded'>
        <div className='bg-gray-700 px-4 py-3'>
          <h2>Goal title</h2>
        </div>
        <div className='mt-4 flex justify-between items-center'>
          <div>
          <span className='bg-amber-800 text-amber-400 px-2 py-2 rounded-full text-xs mr-3'>Medium Priority</span>
          <span className='bg-gray-700 text-slate-400 px-2 py-2 rounded-full text-xs'>Pending</span>
          </div>
          <div className='flex justify-between items-center gap-3'>
            <h3>Progress:</h3>
            <div className='progressbar relative w-48 h-2 rounded-lg bg-gray-700'>
              <span className='absolute top-0 left-0 w-24 h-2 bg-sky-700 rounded-lg'></span>
            </div>
            <p>40%</p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div  className='mt-3 bg-gray-700 px-4 py-3 h-[150px]'>
            <h3>Description</h3>
            <p className='h-[100px] overflow-scroll no-scrollbar'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores esse neque voluptas magnam quia placeat iusto rerum, alias eaque aperiam. Adipisci, fuga? Fuga neque error aliquam non excepturi! Cum, modi.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum possimus error autem fugit aliquid. Obcaecati iste aspernatur illo, quibusdam est, libero sint quisquam eos, inventore accusantium unde maiores neque. Libero?</p>
          </div>
          <div  className='mt-3 bg-gray-700 px-4 py-3 h-[150px]'>
            <h3>TimeLine</h3>
            <div className='flex items-center justify-between my-3'>
              <div className='flex items-center gap-3'>
                <ion-icon size="large" name="calendar-outline"></ion-icon>
                <h4>Start Date:</h4>
              </div>
              <p>Jan21,2025,6:30Am</p>
            </div>
            <div className='flex items-center justify-between my-3'>
              <div className='flex items-center gap-3'>
              <ion-icon size="large" name="flag-outline"></ion-icon>
                <h4>End Date:</h4>
              </div>
              <p>Jan25,2025,6:30Am</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  </>
}