import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiMenuAlt2 } from "react-icons/hi";
import { GoGoal } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { VscMilestone } from "react-icons/vsc";
import { GiProgression } from "react-icons/gi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import { AiOutlineUser } from "react-icons/ai";
import Calendar from "./Calendar";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";

const Menu = () => {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [open, setOpen] = useState(true);

    const handleLogoutClick = (e) => {
        e.preventDefault();
        console.log('Logout clicked');
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = async () => {
        setIsLoggingOut(true);
        setShowLogoutModal(false);

        try {
            await axiosClient.post("/auth/logout");
            localStorage.clear();
            setUser(null);
            setToken(null);
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
            if (error.response?.data?.message) {
                console.error("Server error:", error.response.data.message);
            }
            // Force logout for security even if API call fails
            localStorage.clear();
            setUser(null);
            setToken(null);
            navigate('/login');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    const menus = [
        { name: "Profile", link: "/profile", icon: AiOutlineUser },
        { name: "Goal", link: "/goals", icon: GoGoal },
        { name: "Milestone", link: "/milestones", icon: VscMilestone },
        { name: "Task", link: "/tasks", icon: GoTasklist },
        { name: "My Progress", link: "/progress", icon: GiProgression, margin: true },
        // { name: "Documentation", link: "/documentation", icon: FaRegCalendarAlt },
        { name: "Log out", onClick: handleLogoutClick, icon: RiLogoutCircleLine },
    ];

    return (
        <section className="flex overflow-x-hidden w-full font-Pridi">
            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
                    <div className="p-6 mx-4 w-full max-w-sm bg-white rounded-lg">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Confirm Logout</h3>
                        <p className="mb-6 text-gray-600">Are you sure you want to logout?</p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={handleLogoutCancel}
                                className="px-4 py-2 font-medium text-gray-600 rounded-md hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                disabled={isLoggingOut}
                                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium ${
                                    isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div
                className={`fixed left-0 top-0 h-screen bg-sidebar overflow-x-hidden py-5 ${open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-4 z-40 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600`}
            >
                <div className="flex justify-end">
                    {open ? (
                        <HiMenuAlt3
                            size={26}
                            className="cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                    ) : (
                        <HiMenuAlt2
                            size={26}
                            className="cursor-pointer"
                            onClick={() => setOpen(!open)}
                        />
                    )}
                </div>
                <UserProfile open={open} />
                <div className="flex relative flex-col gap-4 mt-4">
                    {menus.map((menu, i) => (
                        menu.onClick ? (
                            <button
                                key={i}
                                onClick={menu.onClick}
                                disabled={isLoggingOut}
                                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="relative group/icon">
                                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                                    <span className={`${open ? 'hidden' : 'fixed'} z-50 px-2 py-1 ml-16 text-xs text-white whitespace-nowrap bg-gray-800 rounded-md shadow-lg opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 min-w-[120px]`}>
                                        {menu.name}
                                    </span>
                                </div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    {isLoggingOut ? 'Logging out...' : menu.name}
                                </h2>
                            </button>
                        ) : (
                            <Link
                                to={menu.link}
                                key={i}
                                className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                            >
                                <div className="relative group/icon">
                                    <div>{React.createElement(menu.icon, { size: "20" })}</div>
                                    <span className={`${open ? 'hidden' : 'fixed'} z-50 px-2 py-1 ml-16 text-xs text-white whitespace-nowrap bg-gray-800 rounded-md shadow-lg opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 min-w-[120px]`}>
                                        {menu.name}
                                    </span>
                                </div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    {menu.name}
                                </h2>
                                <div
                                    className={`${open && "hidden"
                                        } absolute left-14 bg-white text-gray-900 px-2 py-1 rounded-md shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                >
                                    {menu.name}
                                </div>
                            </Link>
                        )
                    ))}
                </div>
                {open ? <Calendar open={open} className="" /> :
                    <div className="relative group/icon">
                        <FaRegCalendarAlt
                            className="flex items-center mt-5 ml-2 cursor-pointer"
                            size={20}
                            onClick={() => setOpen(true)}
                        />
                        <span className="fixed z-50 px-2 py-1 ml-16 text-xs text-white whitespace-nowrap bg-gray-800 rounded-md shadow-lg opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100">
                            Calendar
                        </span>
                    </div>
                }
            </div>

            <div
                className={`flex-1 transition-all duration-500 ${open ? "ml-72" : "ml-16"
                    }`}
            >
                <div className="min-h-screen font-Poppins">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default Menu;