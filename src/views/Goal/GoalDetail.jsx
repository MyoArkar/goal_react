import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utilities/dateFormater';
import axiosClient from '../../axiosClient';

export default function GoalDetail() {
  const { id } = useParams();
  const [goal, setGoal] = useState([]);

  const fetchGoal = async () => {
    try {
        const { data } = await axiosClient.get(`/goals/${id}`);
        setGoal(data.data);
      console.log(data.message);
      console.log(data)
    } catch (error) {
        console.error("Error fetching goal:", error);
        alert("Failed to fetch goal. Please try again.");
    }
  };
  useEffect(() => {
  
  
          fetchGoal();
      }, []);
  return <>
<div className="container text-gray-400 px-10 py-10">
  <div className="bg-gray-900 px-10 py-3 rounded">
    <div className="bg-gray-800 px-4 py-3 rounded-t-md">
          <h2 className="text-gray-200 font-semibold">{goal.title}</h2>
    </div>
    <div className="mt-4 flex justify-between items-center">
      <div>
        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs mr-3">
          {goal.priority} Priority
        </span>
        <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded-full text-xs">
          {goal.status}
        </span>
      </div>
      <div className="flex justify-between items-center gap-3">
        <h3 className="text-gray-300 font-medium">Progress:</h3>
        <div className="progressbar relative w-48 h-2 rounded-lg bg-gray-700">
          <span className="absolute top-0 left-0 w-24 h-2 bg-gray-500 rounded-lg"></span>
        </div>
        <p className="text-gray-300">40%</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="mt-3 bg-gray-800 px-4 py-3 h-[150px] rounded-md">
        <h3 className="text-gray-200 font-medium">Description</h3>
        <p className="h-[100px] overflow-scroll no-scrollbar text-gray-300">
          {goal.description}
        </p>
      </div>
      <div className="mt-3 bg-gray-800 px-4 py-3 h-[150px] rounded-md">
        <h3 className="text-gray-200 font-medium">Timeline</h3>
        <div className="flex items-center justify-between my-3">
          <div className="flex items-center gap-3 text-gray-300">
            <ion-icon size="large" name="calendar-outline"></ion-icon>
            <h4>Start Date:</h4>
          </div>
              <p className="text-gray-400">{formatDate(goal.start_date)}</p>
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="flex items-center gap-3 text-gray-300">
            <ion-icon size="large" name="flag-outline"></ion-icon>
            <h4>End Date:</h4>
          </div>
              <p className="text-gray-400">{formatDate(goal.end_date)}</p>
        </div>
      </div>
    </div>
  </div>
</div>



  </>
}