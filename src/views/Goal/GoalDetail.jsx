import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utilities/dateFormater';
import axiosClient from '../../axiosClient';
import MilestoneModal from './MilestoneModal';
import MilestoneAndTask from './MilestoneList';
import { BsPlusCircleDotted } from "react-icons/bs";
import { LuGoal } from "react-icons/lu";
import { TbFileDescription } from "react-icons/tb";
import { MdLowPriority } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
export default function GoalDetail() {
  const { id } = useParams();
  const [goal, setGoal] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedMile, setSelectedMile] = useState(null);

  const fetchGoal = async () => {
    try {
      const { data } = await axiosClient.get(`/goals/${id}`);
      setGoal(data.data);
      console.log(data.message);
      console.log(data)
    } catch (error) {
      console.error("Error fetching goal:", error);
      // alert("Failed to fetch goal. Please try again.");
    }
  };
  const fetchMilestoneList = async () => {
    try {
      const { data } = await axiosClient.get(`/goals/${id}/milestones`);
      setMilestones(data.data.milestones);
      console.log(data.message);
    } catch (error) {
      console.error("Error fetching MileStones:", error);
      // alert("Failed to fetch MileStones. Please try again.");
    }
  };

  const handleUpdateClick = (milestone) => {
    setUpdate(true);
    setSelectedMile(milestone);
    setShowModel(true);
  };
  const handleCreateClick = () => {
    setUpdate(false);
    setShowModel(true);
  };
  const handleClose = () => {
    setShowModel(false);
    fetchMilestoneList();
  };

  const handleDelete = async (milestoneId) => {
    try {
      await axiosClient.delete(`/goals/${id}/milestones/${milestoneId}`);
      console.log('MileStone deleted successfully');
      fetchMilestoneList();
    } catch (error) {
      console.error("Error deleting goals:", error);
      alert("Failed to delete goal. Please try again.");
    }
  };

  useEffect(() => {
    fetchGoal();
    fetchMilestoneList();
  }, []);
  return (
    <div className="w-full px-5 py-5 mx-auto gap-5 flex  min-h-screen text-sm pt-16">
      <MilestoneModal
        goalId={id}
        visible={showModel}
        onClose={handleClose}
        update={update}
        milestone={selectedMile} />
      {/* Goal Header */}
      <div className='flex flex-col basis-3/4 gap-5 border-2 border-slate-300 p-5 h-fit rounded-md'>
        <div className="text-bodyText flex justify-between items-center">
          <div className='flex gap-1 items-center'>
            <LuGoal />
            <h3>Title</h3>
          </div>
          <h2 className="">{goal.title}</h2>
        </div>
        <div className='text-bodyText flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <TbFileDescription />
            <h3>Description</h3>
          </div>
          <div>
            <p> {goal.description}</p>
          </div>
        </div>
        <div className='text-bodyText flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <TbFileDescription />
            <h3>Status</h3>
          </div>
          <div className='bg-gray-200 p-1 rounded-md'>
            <p className='text-[12px]'> {goal.status}</p>
          </div>
        </div>
        <div className='text-bodyText flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <MdLowPriority />
            <h3>Priority</h3>
          </div>
          <div className='bg-gray-200 p-1 rounded-md'>
            <p className='text-[12px]'> {goal.priority}</p>
          </div>
        </div>
        <div className='text-bodyText flex justify-between items-center'>
          <div className='flex flex-col gap-3 items-start'>
            <div className='flex gap-1'>
              <GiProgression />
              <h3>Progress</h3>
            </div>
            <div className='relative w-[300px] bg-black rounded overflow-hidden h-2'>
              <div style={{ width: `${goal.progress_percentage}%` }} className='absolute h-2 bg-sky-500'></div>
            </div>
          </div>
          <div className='flex flex-col bg-gray-200 p-1 rounded-md'>
            <p className='text-[12px]'> {goal.progress_percentage}</p>
          </div>
        </div>
        <div className='text-bodyText flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <CiCalendarDate />
            <h3>Start Date</h3>
          </div>
          <div className='bg-gray-200  p-1 rounded-md'>
            <p className='text-[12px]'> {formatDate(goal.start_date)}</p>
          </div>
        </div>
        <div className='text-bodyText  flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <CiCalendarDate />
            <h3>End Date</h3>
          </div>
          <div className='bg-gray-200 p-1 rounded-md'>
            <p className='text-[12px]'> {formatDate(goal.end_date)}</p>
          </div>
        </div>
      </div>
      {/* milestone section */}
      <div className='flex flex-col gap-5 basis-2/4'>
        <button onClick={handleCreateClick} class="bg-slate-950 rounded-md text-sm text-defaultText flex items-center justify-between py-2 px-2">
          <span className='text-[12px]'>Add New Milestone</span>
          <BsPlusCircleDotted />
        </button>
        {milestones.map((milestone) => (
          <MilestoneAndTask goalId={id} milestone={milestone} milestoneUpdate={handleUpdateClick} milestoneDelete={handleDelete} fetchGoal={fetchGoal} fetchMilestoneList={fetchMilestoneList} />
        ))}
      </div>
    </div>
  )
}