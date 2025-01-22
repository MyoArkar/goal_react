import React from 'react'
import user from "../assets/userImg/1333622.png"
import { motion } from 'framer-motion'
export default function UserProfile({ open }) {
    return (
        <motion.div whileHover={{ scale: 1.06 }} className={`mt-4 flex cursor-pointer items-center gap-4 text-sm font-semibold ${open ? "transition-all duration-300 delay-200" : "-ml-2 transition-all duration-300 delay-100"} `}
        >
            <div className="min-w-[3rem] h-[3rem]">
                <img src={user} alt="profile" className='w-full h-full rounded-full
                 object-cover' />
            </div>
            <div className={`flex flex-col justify-center ${open ? "opacity-100 duration-500 delay-500" : "opacity-0 duration-200 delay-100"} `}>
                <h2 className='
                text-[1.1rem]'>Alex</h2>
                <span className='text-[0.75rem] text-white/40'>alex@mail.com</span>
            </div>
        </motion.div >
    )
}
