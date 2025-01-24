import React, { useEffect, useRef, useState } from 'react'
import { convertToISOString } from '../../utilities/dateFormater';
import axiosClient from '../../axiosClient';
import { convertToDateTime } from '../../utilities/dateFormater';

export default function TaskModal({ milestoneId, update, visible, onClose, task }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueRef = useRef();
  const priorityRef = useRef();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (visible && update && task && 
        titleRef.current && 
        descriptionRef.current && 
        dueRef.current && 
        priorityRef.current) {
      titleRef.current.value = task.title || '';
      descriptionRef.current.value = task.description || '';
      dueRef.current.value = task.due_date ? convertToDateTime(task.due_date) : '';
      priorityRef.current.value = task.priority;
    }
    // Clear errors when modal opens/closes
    setErrors({});
  }, [update, task, visible]);

  if (!visible) return null;

  const handleCreate = () => {
    setErrors({});
    const payload = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      due_date: dueRef.current.value,
      priority: priorityRef.current.value,
      status: 'in_progress'
    };

    axiosClient.post(`milestones/${milestoneId}/tasks`, payload).then(() => {
      onClose();
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
        setErrors(response.data.errors);
      }
    });
    console.log(payload)
  };

  const handleUpdate = () => {
    setErrors({});
    const payload = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      due_date: convertToISOString(dueRef.current.value),
      priority: priorityRef.current.value,
    };

    axiosClient.put(`milestones/${milestoneId}/tasks/${task.id}`, payload).then(() => {
      onClose();
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
        setErrors(response.data.errors);
      }
    });
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[32rem] flex flex-col justify-center items-center text-bodyText bg-white/50 backdrop-blur-3xl shadow-lg ring-1 ring-black/5 p-5 rounded-md gap-5">
        <div className='flex justify-end w-full'>
          <button onClick={onClose}>
            <ion-icon size="small" name="close-circle-outline"></ion-icon>
          </button>
        </div>
        <h3>{update ? 'Update Task' : 'Create New Task'}</h3>
        <div className='flex flex-col w-full'>
          <label htmlFor="">Title</label>
          <input ref={titleRef} type="text" name="" id="" className='p-2 rounded-md ring-1 shadow-sm outline-none bg-white/40 ring-black/5' />
          {errors.title && <p className='text-red-500'>{errors.title}</p>}
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="">Description</label>
          <input ref={descriptionRef} type="text" name="" id="" className='p-2 rounded-md ring-1 shadow-sm outline-none bg-white/40 ring-black/5' />
          {errors.description && <p className='text-red-500'>{errors.description}</p>}
        </div>
        <div className="flex flex-row gap-3 justify-between w-full">
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Due Date</label>
            <input ref={dueRef} type="datetime-local" name="" id="" className='p-2 rounded-md ring-1 shadow-sm outline-none bg-white/40 ring-black/5' />
            {errors.due_date && <p className='text-red-500'>{errors.due_date}</p>}
          </div>
          <div className='flex flex-col w-1/2'>
            <label htmlFor="">Priority</label>
            <select ref={priorityRef} defaultValue="high" name="" id="" className='p-2 rounded-md ring-1 shadow-sm outline-none bg-white/40 ring-black/5'>
              <option value="high" selected>High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-3 w-full">
          <button onClick={onClose}
            className='px-3 py-2 rounded-md ring-2 bg-white/40 ring-black/5 text-bodyText hover:bg-sidebar hover:text-defaultText'>Cancel</button>
          {update ? (
            <button
              className='px-3 py-2 rounded-md ring-2 bg-white/40 ring-black/5 text-bodyText hover:bg-sidebar hover:text-defaultText'
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className='px-3 py-2 rounded-md ring-2 bg-white/40 ring-black/5 text-bodyText hover:bg-sidebar hover:text-defaultText'
              onClick={handleCreate}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
