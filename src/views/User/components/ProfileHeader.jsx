import { motion } from 'framer-motion';

export default function ProfileHeader({ children }) {
    return (
        <div className="relative">
            {/* Minimal Background */}
            <div className="h-48 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-50/50"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </div>
            </div>
            
            {/* Profile Picture Container */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-24">
                {children}
            </div>
        </div>
    );
}
