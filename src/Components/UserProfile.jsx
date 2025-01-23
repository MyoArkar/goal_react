import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStateContext } from '../contexts/contextprovider';

// Create a custom event for profile picture updates
export const PROFILE_PICTURE_UPDATE = 'PROFILE_PICTURE_UPDATE';

export default function UserProfile({ open }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [localImageUrl, setLocalImageUrl] = useState(null);
    const { user, refreshUserData } = useStateContext();

    useEffect(() => {
        refreshUserData();
    }, [refreshUserData]);

    // Listen for profile picture updates
    useEffect(() => {
        const handleProfilePictureUpdate = (event) => {
            const { localUrl } = event.detail;
            setLocalImageUrl(localUrl);
            setImageError(false);
        };

        // Subscribe to profile picture updates
        window.addEventListener(PROFILE_PICTURE_UPDATE, handleProfilePictureUpdate);

        return () => {
            window.removeEventListener(PROFILE_PICTURE_UPDATE, handleProfilePictureUpdate);
        };
    }, []);

    // Reset local image URL when user data changes
    useEffect(() => {
        setLocalImageUrl(null);
    }, [user?.profile_picture]);

    const handleImageError = () => {
        setImageError(true);
        setLocalImageUrl(null);
    };

    if (!user) {
        return (
            <motion.div 
                className={`mt-4 flex items-center gap-4 ${open ? "transition-all duration-300 delay-200" : "-ml-2 transition-all duration-300 delay-100"}`}
            >
                <div className="min-w-[3rem] h-[3rem] bg-gray-200 rounded-full animate-pulse"></div>
                {open && (
                    <div className="flex flex-col gap-2">
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                )}
            </motion.div>
        );
    }

    return (
        <div className="relative">
            <motion.div 
                whileHover={{ scale: 1.03 }} 
                className={`mt-4 flex cursor-pointer items-center gap-4 text-sm font-semibold
                    ${open ? "transition-all duration-300 delay-200" : "-ml-2 transition-all duration-300 delay-100"}`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="min-w-[3rem] w-12 h-12 p-1 relative group overflow-hidden flex-shrink-0"
                >
                    {(localImageUrl || (user.profile_picture && !imageError)) ? (
                        <img 
                            src={localImageUrl || user.profile_picture}
                            alt={user.name}
                            onError={handleImageError}
                            className='object-cover w-full h-full rounded-full ring-2 ring-sky-500 ring-offset-2 transition-all duration-300'
                            style={{
                                aspectRatio: '1/1',
                                objectFit: 'cover',
                                minWidth: '100%',
                                minHeight: '100%'
                            }}
                        />
                    ) : (
                        <div className='flex justify-center items-center w-full h-full bg-gradient-to-br from-sky-400 to-sky-600 rounded-full ring-2 ring-sky-500 ring-offset-2 transition-all duration-300'>
                            <span className="text-xl font-bold text-white select-none">
                                {user.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                    )}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute -right-1 -bottom-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"
                    />
                </motion.div>
                <div className={`flex flex-col justify-center overflow-hidden
                    ${open ? "w-auto opacity-100 duration-500 delay-200" : "w-0 opacity-0 duration-200 delay-100"}`}
                >
                    <h2 className='text-[1.1rem] text-white truncate max-w-[120px] font-medium'>
                        {user.name}
                    </h2>
                    <span className='text-[0.75rem] text-white/50 truncate max-w-[120px]'>{user.email}</span>
                </div>
            </motion.div>

            <AnimatePresence>
                {showTooltip && open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed z-50 px-3 py-2 ml-2 text-sm text-gray-800 bg-white rounded-lg shadow-lg"
                        style={{
                            left: '100%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            maxWidth: '300px',
                        }}
                    >
                        View Profile
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
