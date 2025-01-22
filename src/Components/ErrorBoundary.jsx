import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorBoundary() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
                <div className="mb-6">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto text-red-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    The page you are looking for might have been removed, 
                    had its name changed, or is temporarily unavailable.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link 
                        to="/" 
                        className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                    >
                        Go to Home
                    </Link>
                    <Link 
                        to="/profile" 
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
