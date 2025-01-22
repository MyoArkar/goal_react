import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

const GoalAndMilestone = ({goals}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

//  useEffect(() => {
//    const fetchGoals = async () => {
//      try {
//        const response = await axiosClient.get("/goals/"); // Fetch goals
//        setGoals(response.data.data.data); // Assuming response.data is an array of goals
//      } catch (error) {
//        console.error("Error fetching goals:", error);
//      } finally {
//        setLoading(false);
//      }
//    };
//
//    fetchGoals();
//  }, []);

  const handleButtonClick = () => {
    setShowModal(true); // Open the modal
  };
  const handleDetail = (id) => {
    navigate(`/goals/${id}`);
};
  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen   text-white">
      
        
      
        <div className="text-center">
          <p className="mb-6 text-gray-400">There is no milestones to show.</p>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          >
            Create a Milestone
          </button>
  
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-[#1a1a1a] text-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-gray-500 hover:text-white"
                >
                  ✕
                </button>
                {goals.length > 0 ? (
                  <>
                    <h2 className="text-lg font-bold mb-4">Select a Goal</h2>
                    <ul className="space-y-3">
                      {goals.map((goal) => (
                        <li
                          key={goal.id}
                          className="p-3 bg-[#2a2a2a] rounded-lg cursor-pointer hover:bg-gray-700 transition-all"
                          onClick={() => handleDetail(goal.id)}
                        >
                          {goal.title}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="mb-4 text-gray-400">No goals found. Please create a goal first.</p>
                    <button
                      onClick={() => navigate("/goals")}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all"
                    >
                      Create a Goal
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      
    </div>
  );
  
};

export default GoalAndMilestone;
