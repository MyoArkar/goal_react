import { motion } from 'framer-motion';

export default function ProfilePicture({ userData, imageError, onImageError }) {
    return (
        <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {userData.profile_picture && !imageError ? (
                <img 
                    src={userData.profile_picture} 
                    alt={userData.name}
                    onError={onImageError}
                    className="w-48 h-48 rounded-full object-cover ring-4 ring-white shadow-2xl transition-transform duration-300"
                />
            ) : (
                <div className="w-48 h-48 rounded-full ring-4 ring-white shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                    <span className="text-6xl font-bold text-gray-500 select-none transform group-hover:scale-110 transition-transform duration-300">
                        {userData.name?.charAt(0)?.toUpperCase()}
                    </span>
                </div>
            )}
            <motion.div 
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-gray-100 via-white to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
}
