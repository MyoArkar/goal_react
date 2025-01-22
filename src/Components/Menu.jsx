import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { VscMilestone } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import UserProfile from "./UserProfile";
import Calendar from "./Calendar";

const Menu = () => {
    const menus = [
        { name: "Home", link: "/", icon: MdOutlineDashboard },
        { name: "Profile", link: "/profile", icon: AiOutlineUser },
        { name: "Goal", link: "/goals", icon: GoGoal },
        { name: "Milestone", link: "/milestones", icon: VscMilestone },
        { name: "Task", link: "/tasks", icon: GoTasklist },
        { name: "My Progress", link: "/progress", icon: GiProgression, margin: true },
        { name: "Log out", link: "/", icon: RiLogoutCircleLine },
    ];
    const [open, setOpen] = useState(true);

    return (
        <div className="flex min-h-screen">
            {/* Fixed Sidebar */}
            <div
                className={`fixed left-0 top-0 h-screen bg-sidebar py-5 ${
                    open ? "w-72" : "w-16"
                } duration-500 text-gray-100 px-4 z-50 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600`}
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
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus.map((menu, i) => (
                        <Link
                            to={menu.link}
                            key={i}
                            className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                        >
                            <div>{React.createElement(menu.icon, { size: "20" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${
                                    !open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                            >
                                {menu.name}
                            </h2>
                            <h2
                                className={`${
                                    open && "hidden"
                                } absolute left-40 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                            >
                                {menu.name}
                            </h2>
                        </Link>
                    ))}
                </div>
                <Calendar />
            </div>

            {/* Main Content with Left Margin */}
            <div 
                className={`flex-1 transition-all duration-500 ${
                    open ? "ml-72" : "ml-16"
                }`}
            >
                <div className="p-4 min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Menu;