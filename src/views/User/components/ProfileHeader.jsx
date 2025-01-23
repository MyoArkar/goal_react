import { motion } from 'framer-motion';

export default function ProfileHeader({ children }) {
    return (
        <div className="relative flex items-center justify-center h-[12rem]">
            {/* Profile Picture Container with Animation */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                {children}
            </motion.div>
        </div>
    );
}
