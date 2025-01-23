import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import axiosClient from '../../../axiosClient';
import { useStateContext } from '../../../contexts/contextprovider';

export default function ProfilePicture({ userData, imageError, onImageError }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);
    const { refreshUserData } = useStateContext();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image size should be less than 5MB');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('profile_picture', file);

        try {
            await axiosClient.post('/auth/profile/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await refreshUserData();
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError(error.response?.data?.message || 'Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />

            {/* Profile Picture */}
            <div className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                {userData.profile_picture && !imageError ? (
                    <div className="relative">
                        <img 
                            src={userData.profile_picture} 
                            alt={userData.name}
                            onError={onImageError}
                            className="object-cover w-48 h-48 rounded-full ring-4 ring-white shadow-2xl transition-transform duration-300"
                        />
                        {isUploading && (
                            <div className="flex absolute inset-0 justify-center items-center rounded-full bg-black/30">
                                <div className="w-8 h-8 rounded-full border-b-2 border-white animate-spin"></div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex overflow-hidden justify-center items-center w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full ring-4 ring-white shadow-2xl transition-all duration-300 group-hover:from-gray-200 group-hover:to-gray-300">
                        <span className="text-6xl font-bold text-gray-500 transition-transform duration-300 transform select-none group-hover:scale-110">
                            {userData.name?.charAt(0)?.toUpperCase()}
                        </span>
                        {isUploading && (
                            <div className="flex absolute inset-0 justify-center items-center rounded-full bg-black/30">
                                <div className="w-8 h-8 rounded-full border-b-2 border-white animate-spin"></div>
                            </div>
                        )}
                    </div>
                )}

                {/* Upload overlay */}
                <div className="flex absolute inset-0 justify-center items-center rounded-full transition-all duration-300 bg-black/0 group-hover:bg-black/30">
                    <div className="opacity-0 transition-all duration-300 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Error message */}
            {uploadError && (
                <div className="absolute -bottom-8 left-1/2 px-3 py-1 text-sm text-red-600 whitespace-nowrap bg-red-100 rounded-full transform -translate-x-1/2">
                    {uploadError}
                </div>
            )}

            <motion.div 
                className="absolute -inset-1 bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
}
