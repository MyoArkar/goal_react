import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import Dashboard from "../views/";
import Profile from "../views/User/Profile";
import Goals from "../views/Goal/goal";
import Milestones from "../views/Milestone";
import Tasks from "../views/Task/Task";
import Progress from "../views/User/Progress";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                {/* <Route
                    path="/"
                    element={
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Dashboard />
                        </motion.div>
                    }
                /> */}
                <Route
                    path="/profile"
                    element={
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Profile />
                        </motion.div>
                    }
                />
                <Route
                    path="/goals"
                    element={<Goals />}
                />
                <Route
                    path="/milestones"
                    element={
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Milestones />
                        </motion.div>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Tasks />
                        </motion.div>
                    }
                />
                <Route
                    path="/progress"
                    element={
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Progress />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
