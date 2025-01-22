import { motion } from 'framer-motion';

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50/50">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-sky-500 rounded-full border-t-transparent"
            />
        </div>
    );
}
