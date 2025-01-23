import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';

export default function Progress() {
    const [totalGoals, setTotalGoals] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [totalMilestones, setTotalMilestones] = useState(0);
    const [completedGoals, setCompletedGoals] = useState(0);
    const [completedMilestones, setCompletedMilestones] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        loadTotalGoals();
        loadTotalTasks();
        loadTotalMilestones();
        loadCompletedGoals();
        loadCompletedMilestones();
        loadCompletedTasks();
        loadGoals();
    }, []);

    const loadTotalGoals = async () => {
        try {
            const response = await axiosClient.get('/goals/all');
            setTotalGoals(response.data.data.goals.length);
        } catch (error) {
            console.error('Error loading goals:', error);
        }
    };

    const loadTotalTasks = async () => {
        try {
            const response = await axiosClient.get('/tasks/all');
            setTotalTasks(response.data.data.tasks.length);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    const loadTotalMilestones = async () => {
        try {
            const response = await axiosClient.get('/milestones/all');
            setTotalMilestones(response.data.data.milestones.length);
        } catch (error) {
            console.error('Error loading milestones:', error);
        }
    }

    const loadCompletedGoals = async () => {
        try {
            const response = await axiosClient.get('/goals/all');
            const completedCount = response.data.data.goals.filter(goal => goal.status === 'completed').length;
            setCompletedGoals(completedCount);
        } catch (error) {
            console.error('Error loading completed goals:', error);
        }
    }

    const loadCompletedMilestones = async () => {
        try {
            const response = await axiosClient.get('/milestones/all');
            const completedCount = response.data.data.milestones.filter(milestone => milestone.status === 'completed').length;
            setCompletedMilestones(completedCount);
        } catch (error) {
            console.error('Error loading completed milestones:', error);
        }
    }

    const loadCompletedTasks = async () => {
        try {
            const response = await axiosClient.get('/tasks/all');
            const completedCount = response.data.data.tasks.filter(task => task.status === 'completed').length;
            setCompletedTasks(completedCount);
        } catch (error) {
            console.error('Error loading completed tasks:', error);
        }
    }

    const loadGoals = async () => {
        try {
            const response = await axiosClient.get('/goals/all');
            setGoals(response.data.data.goals);
        } catch (error) {
            console.error('Error loading goals:', error);
        }
    }

    return (
        <div className='flex flex-col gap-5 px-10 py-5 mx-auto w-full min-h-screen'>
            <h1 className='mb-5 text-sm font-semibold text-bodyText font-Poppins'>Progress Overview</h1>
            <div className="flex flex-col gap-8">
                <div className="overflow-x-auto bg-white/20 shadow-lg ring-1 ring-black/5 backdrop-blur-3xl rounded-md">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr className="text-bodyText">
                                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Completed</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Completion Rate</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            <tr className="text-bodyText hover:bg-white/10">
                                <td className="px-6 py-4 text-sm">Goals</td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">{totalGoals}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">{completedGoals}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">
                                        {totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%
                                    </span>
                                </td>
                            </tr>
                            <tr className="text-bodyText hover:bg-white/10">
                                <td className="px-6 py-4 text-sm">Milestones</td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">{totalMilestones}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">{completedMilestones}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">
                                        {totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0}%
                                    </span>
                                </td>
                            </tr>
                            <tr className="text-bodyText hover:bg-white/10">
                                <td className="px-6 py-4 text-sm">Tasks</td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">{totalTasks}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">{completedTasks}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[24px] font-semibold text-green-400">
                                        {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 gap-5 place-content-center text-sm text-bodyText">
                    <div className='p-6 text-sm rounded-md ring-1 shadow-lg backdrop-blur-3xl bg-white/20 ring-black/5 text-bodyText'>
                        <h5 className='font-semibold text-[16px] mb-6'>Goal Progress</h5>
                        <div className="grid grid-cols-2 gap-6">
                            {goals?.map((goal, index) => (
                                <div key={index} className="flex flex-col gap-4 p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-gray-800">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{goal.description}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                            goal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                            goal.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>
                                            {goal.status}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-3 mt-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Progress</span>
                                            <span className="text-white font-medium">{goal.progress_percentage}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-sky-500 rounded-full transition-all duration-500"
                                                style={{ width: `${goal.progress_percentage}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mt-2 pt-4 border-t border-gray-800">
                                        <div className="text-center">
                                            <span className="block text-xl font-semibold text-green-400">{goal.milestone_stats.completed}</span>
                                            <span className="text-xs text-gray-400">Completed<br/>Milestones</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-xl font-semibold text-yellow-400">{goal.milestone_stats.in_progress}</span>
                                            <span className="text-xs text-gray-400">Active<br/>Milestones</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-xl font-semibold text-sky-400">{goal.task_stats.completed}</span>
                                            <span className="text-xs text-gray-400">Completed<br/>Tasks</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                        <div>Start: {new Date(goal.start_date).toLocaleDateString()}</div>
                                        <div>Due: {new Date(goal.end_date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
