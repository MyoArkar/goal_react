import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiMenuAlt2 } from "react-icons/hi";
import { GoGoal } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { VscMilestone } from "react-icons/vsc";
import { GiProgression } from "react-icons/gi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import UserProfile from "./UserProfile";
import { AiOutlineUser } from "react-icons/ai";
import Calendar from "./Calendar";

const Menu = () => {
    const menus = [

        { name: "Profile", link: "/profile", icon: AiOutlineUser },
        { name: "Goal", link: "/goals", icon: GoGoal },
        { name: "Milestone", link: "/milestones", icon: VscMilestone },
        { name: "Task", link: "/tasks", icon: GoTasklist },
        { name: "My Progress", link: "/progress", icon: GiProgression, margin: true },
        { name: "Log out", link: "/", icon: RiLogoutCircleLine },
    ];
    const [open, setOpen] = useState(true);

    return (
        <section className="flex overflow-x-hidden w-full font-Pridi">
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
                        <Link
                            to={menu.link}
                            key={i}
                            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                        >
                            <div className="relative group/icon">
                                <div>{React.createElement(menu.icon, { size: "20" })}</div>
                                <span className={`${open ? 'hidden' : ''} fixed ml-16 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 min-w-[120px] shadow-lg`}>
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
                    ))}
                </div>
                {open ? <Calendar open={open} className="" /> :
                    <div className="relative group/icon">
                        <FaRegCalendarAlt
                            className="flex items-center mt-5 ml-2 cursor-pointer"
                            size={20}
                            onClick={() => setOpen(true)}
                        />
                        <span className="fixed ml-16 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 shadow-lg">
                            Calendar
                        </span>
                    </div>
                }
            </div>

            {/* Main Content with Left Margin */}
            <div
                className={`flex-1 transition-all duration-500 ${open ? "ml-72" : "ml-16"
                    }`}
            >
                <div className="min-h-screen">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default Menu;