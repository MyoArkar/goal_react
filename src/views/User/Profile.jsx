import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/contextprovider';
import axiosClient from '../../axiosClient';
import { motion } from 'framer-motion';
import LoadingSpinner from './components/LoadingSpinner';
import ProfileHeader from './components/ProfileHeader';
import ProfilePicture from './components/ProfilePicture';
import PersonalInfo from './components/PersonalInfo';
import AccountStatus from './components/AccountStatus';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [imageError, setImageError] = useState(false);
    const { setUser } = useStateContext();

    const fetchUserData = async () => {
        try {
            const { data } = await axiosClient.get('/auth/profile');
            setUserData(data.data);
            setUser(data.data);
            setImageError(false);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            alert("Failed to fetch user profile. Please try again.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleImageError = () => {
        setImageError(true);
    };

    if (!userData) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <ProfileHeader>
                <ProfilePicture 
                    userData={userData} 
                    imageError={imageError} 
                    onImageError={handleImageError}
                />
            </ProfileHeader>

            {/* Main Content */}
            <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
                <div className="pt-32">
                    {/* Name and Email */}
                    <motion.div 
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                        <p className="mt-2 text-lg text-gray-600">{userData.email}</p>
                    </motion.div>

                    {/* Profile Information */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        <PersonalInfo userData={userData} />
                        <AccountStatus />
                    </div>
                </div>
            </div>
        </div>
    );
}
