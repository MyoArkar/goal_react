import React, { useEffect, useRef, useState } from 'react'
import { convertToISOString } from '../../utilities/dateFormater';
import axiosClient from '../../axiosClient';
import { convertToDateTime } from '../../utilities/dateFormater';

export default function MilestoneModal({ goalId, visible, onClose, update, milestone }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueRef = useRef();
  const priorityRef = useRef();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (visible && update && milestone && 
        titleRef.current && 
        descriptionRef.current && 
        dueRef.current && 
        priorityRef.current) {
      titleRef.current.value = milestone.title || '';
      descriptionRef.current.value = milestone.description || '';
      dueRef.current.value = milestone.due_date ? convertToDateTime(milestone.due_date) : '';
      priorityRef.current.value = milestone.priority;
    }
    // Clear errors when modal opens/closes
    setErrors({});
  }, [update, milestone, visible]);

  if (!visible) return null;

  const handleCreate = () => {
    setErrors({});
    const payload = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      due_date: dueRef.current.value,
      priority: priorityRef.current.value,
      status: "in_progress"
    };

    axiosClient.post(`/goals/${goalId}/milestones`, payload).then(() => {
      onClose();
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    });
  };

  const handleUpdate = () => {
    setErrors({});
    const payload = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      due_date: convertToISOString(dueRef.current.value),
      priority: priorityRef.current.value,
    };

    axiosClient.put(`/goals/${goalId}/milestones/${milestone.id}`, payload).then(() => {
      onClose();
    }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[32rem] flex flex-col justify-center items-center text-bodyText bg-white/50 backdrop-blur-3xl shadow-lg ring-1 ring-black/5 p-5 rounded-md gap-5">
        <div className='w-full flex justify-end'>
          <button onClick={onClose}>
            <ion-icon size="small" name="close-circle-outline"></ion-icon>
          </button>
        </div>
        <h3>{update ? 'Update Milestone' : 'Create New Milestone'}</h3>
        <div className='w-full flex flex-col'>
          <label htmlFor="">Title</label>
          <input 
            ref={titleRef} 
            type="text" 
            className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.title ? 'ring-red-500' : 'ring-black/5'}`} 
          />
          {errors.title && <span className="mt-1 text-xs text-red-500">{errors.title[0]}</span>}
        </div>
        <div className='w-full flex flex-col'>
          <label htmlFor="">Description</label>
          <input 
            ref={descriptionRef} 
            type="text" 
            className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.description ? 'ring-red-500' : 'ring-black/5'}`} 
          />
          {errors.description && <span className="mt-1 text-xs text-red-500">{errors.description[0]}</span>}
        </div>

        <div className="w-full flex flex-row justify-between gap-3">
          <div className='w-1/2 flex flex-col'>
            <label htmlFor="">Due Date</label>
            <input 
              ref={dueRef} 
              type="datetime-local" 
              className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.due_date ? 'ring-red-500' : 'ring-black/5'}`} 
            />
            {errors.due_date && <span className="mt-1 text-xs text-red-500">{errors.due_date[0]}</span>}
          </div>
          <div className='w-1/2 flex flex-col'>
            <label htmlFor="">Priority</label>
            <select 
              ref={priorityRef} 
              defaultValue="high" 
              className={`outline-none p-2 bg-white/40 rounded-md shadow-sm ring-1 ${errors.priority ? 'ring-red-500' : 'ring-black/5'}`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {errors.priority && <span className="mt-1 text-xs text-red-500">{errors.priority[0]}</span>}
          </div>
        </div>
        <div className="w-full flex flex-row-reverse gap-3">
          <button 
            onClick={onClose}
            className='px-3 py-2 rounded-md ring-2 bg-white/40 ring-black/5 text-bodyText hover:bg-sidebar hover:text-defaultText'
          >
            Cancel
          </button>

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
  );
}
