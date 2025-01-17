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
    <div className="container text-[#0e0e0e] px-10 py-10">
      <div className="border-[#0e0e0e] border-2 rounded-3xl overflow-hidden">
        <div className="bg-[#0e0e0e] text-slate-50 px-4 py-3">
          <h2 className="font-semibold">{goal.title}</h2>
        </div>
        <div className='py-4 px-3'>
          <div className="flex justify-between items-center">
            <div>
              <span className="border-[#0e0e0e] text-[#0e0e0e] px-2 py-1 rounded-full text-xs mr-3 border-2">
                {goal.priority} Priority
              </span>
              <span className="border-[#0e0e0e] text-[#0e0e0e] px-2 py-1 rounded-full text-xs border-2">
                {goal.status}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <h3 className="text-[#0e0e0e] font-medium">Progress:</h3>
              <div className="progressbar relative w-48 h-2 rounded-lg border-[#0e0e0e] border-2">
                <span className="absolute top-0 left-0 w-24 h-2 bg-[#0e0e0e] rounded-lg"></span>
              </div>
              <p className="text-[#0e0e0e]">40%</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mt-3 border-[#0e0e0e] px-4 py-3 h-[150px] rounded-md border-2">
              <h3 className="text-slate-50 font-medium">Description</h3>
              <p className="h-[100px] overflow-scroll no-scrollbar text-[#0e0e0e]">
                {goal.description}
              </p>
            </div>
            <div className="mt-3 border-[#0e0e0e] px-4 py-3 h-[150px] rounded-md border-2">
              <h3 className="text-slate-50 font-medium">Timeline</h3>
              <div className="flex items-center justify-between my-3">
                <div className="flex items-center gap-3 text-[#0e0e0e]">
                  <ion-icon size="large" name="calendar-outline"></ion-icon>
                  <h4>Start Date:</h4>
                </div>
                <p>{formatDate(goal.start_date)}</p>
              </div>
              <div className="flex items-center justify-between my-3">
                <div className="flex items-center gap-3 text-[#0e0e0e]">
                  <ion-icon size="large" name="flag-outline"></ion-icon>
                  <h4>End Date:</h4>
                </div>
                <p>{formatDate(goal.end_date)}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </>

}