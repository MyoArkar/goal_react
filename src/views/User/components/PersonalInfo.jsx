import { motion } from 'framer-motion';

export default function PersonalInfo({ userData }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
            </h2>
            <div className="space-y-6">
                <div className="group hover:bg-sky-50/50 p-3 rounded-lg transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            <p className="mt-1 text-gray-900 font-medium group-hover:text-sky-600 transition-colors">{userData.name}</p>
                        </div>
                    </div>
                </div>

                <div className="group hover:bg-sky-50/50 p-3 rounded-lg transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-500">Email Address</label>
                            <p className="mt-1 text-gray-900 font-medium group-hover:text-sky-600 transition-colors break-all">{userData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="group hover:bg-sky-50/50 p-3 rounded-lg transition-colors duration-300">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-500">Member Since</label>
                            <p className="mt-1 text-gray-900 font-medium group-hover:text-sky-600 transition-colors">
                                {new Date(userData.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
