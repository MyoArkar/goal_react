import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';

export default function PersonalInfo({ userData, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email
    });
    const [loading, setLoading] = useState(false);

    // Update form data when userData changes
    useEffect(() => {
        setFormData({
            name: userData.name,
            email: userData.email
        });
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Only include fields that have changed
        const changedFields = {};
        if (formData.name !== userData.name) changedFields.name = formData.name;
        if (formData.email !== userData.email) changedFields.email = formData.email;

        // If nothing has changed, just exit edit mode
        if (Object.keys(changedFields).length === 0) {
            setIsEditing(false);
            setLoading(false);
            return;
        }

        try {
            const response = await axiosClient.put('/auth/profile', changedFields);
            if (response.data.success) {
                onUpdate(response.data.data);
                setIsEditing(false);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat().join('\\n')
                : error.response?.data?.message || 'Failed to update profile';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const hasChanges = () => {
        return formData.name !== userData.name || formData.email !== userData.email;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border border-gray-100 shadow-sm backdrop-blur-sm transition-all duration-300 bg-white/80 hover:shadow-md"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="flex items-center text-xl font-semibold text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                </h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center text-sm font-medium text-sky-600 hover:text-sky-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                )}
            </div>
            <div className="space-y-6">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="p-3 rounded-lg transition-colors duration-300 group">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block mt-1 w-full px-4 py-2 text-gray-900 placeholder-gray-400 bg-white/50 border border-gray-200 rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 focus:outline-none"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg transition-colors duration-300 group">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block mt-1 w-full px-4 py-2 text-gray-900 placeholder-gray-400 bg-white/50 border border-gray-200 rounded-lg backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 focus:outline-none"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ name: userData.name, email: userData.email });
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !hasChanges()}
                                className={`px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                                    (loading || !hasChanges()) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="p-3 rounded-lg transition-colors duration-300 group hover:bg-sky-50/50">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                                    <p className="mt-1 font-medium text-gray-900 transition-colors group-hover:text-sky-600">{userData.name}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg transition-colors duration-300 group hover:bg-sky-50/50">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                                    <p className="mt-1 font-medium text-gray-900 break-all transition-colors group-hover:text-sky-600">{userData.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg transition-colors duration-300 group hover:bg-sky-50/50">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                                    <p className="mt-1 font-medium text-gray-900 transition-colors group-hover:text-sky-600">
                                        {new Date(userData.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
