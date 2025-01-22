import { motion } from 'framer-motion';

export default function AccountStatus() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Account Status
            </h2>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700">Active Account</span>
                </div>
                <p className="text-sm text-gray-600">
                    Your account is in good standing and has full access to all features.
                </p>
            </div>
        </motion.div>
    );
}
