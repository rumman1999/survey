import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHamburger,
  faHouse,
  faSearch,
  faFilter,
  faEdit,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";

const REACT_APP_API_ENDPOINT = "https://survey-backend-g0aa.onrender.com";

const SurveyItems = () => {
  const {
    surveyList,
    setSelectedSurveyID,
    setEditingSurvey,
    fetchQuestionsList,
    fetchSurveyDetails,
    getSurveyListData
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleEditSurvey = (surveyId) => {
    fetchSurveyDetails(surveyId);
    fetchQuestionsList(surveyId);
    setEditingSurvey(true);
    setSelectedSurveyID(surveyId);
    navigate("/surveyForm");
  };

  const handleDeleteSurvey = (id) => {
    const email = localStorage.getItem("email");

    fetch(`${REACT_APP_API_ENDPOINT}/survey/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response if needed
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateSurvey = () => {
    navigate("/surveyForm");
  };

  useEffect(()=>{
    getSurveyListData()
  },[])


  return (
    <div className="flex-1 p-6 bg-gray-100 overflow-auto">
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between mb-4">
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold flex items-center ">
          Survey List
        </div>
  
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <div className="text-gray-700 flex items-center space-x-2">
            <FontAwesomeIcon icon={faFilter} className="text-xl" />
          </div>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            onClick={handleCreateSurvey}
          >
            <span>Create</span>
          </button>
        </div>
      </div>
  
      <motion.table
        className="w-full bg-white border border-gray-300 rounded-lg hidden md:table"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveyList?.map((survey) => (
            <motion.tr
              key={survey._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2 text-sm md:text-base">
                {survey.name}
              </td>
              <td className="px-4 py-2 text-sm md:text-base">
                {survey.surveyType}
              </td>
              <td className="px-4 py-2 text-sm md:text-base">
                {survey.description}
              </td>
              <td className="px-4 py-2 text-sm md:text-base">
                {survey.startDate}
              </td>
              <td className="px-4 py-2 text-sm md:text-base">
                {survey.endDate}
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <FontAwesomeIcon
                  className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                  icon={faEdit}
                  onClick={() => handleEditSurvey(survey._id)}
                />
                <FontAwesomeIcon
                  className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  icon={faDeleteLeft}
                  onClick={() => handleDeleteSurvey(survey._id)}
                />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
  
      {/* Mobile view table */}
      <div className="block md:hidden">
        <div className="bg-gray-200 text-left p-4 rounded-t-lg mb-2 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Name</h3>
            <div className="flex space-x-2">
              <span className="text-sm font-semibold">Actions</span>
            </div>
          </div>
        </div>
        {surveyList?.map((survey) => (
          <div
            key={survey._id}
            className="bg-white border border-gray-300 rounded-lg mb-4 p-4 shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{survey.name}</h3>
              <div className="flex space-x-2">
                <FontAwesomeIcon
                  className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                  icon={faEdit}
                  onClick={() => handleEditSurvey(survey._id)}
                />
                <FontAwesomeIcon
                  className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  icon={faDeleteLeft}
                  onClick={() => handleDeleteSurvey(survey._id)}
                />
              </div>
            </div>
            <p className="text-sm">{survey.surveyType}</p>
            <p className="text-sm">{survey.description}</p>
            <p className="text-sm">{survey.startDate}</p>
            <p className="text-sm">{survey.endDate}</p>
          </div>
        ))}
      </div>
  
      {/* Mobile view table */}
      <div className="block md:hidden">
        {surveyList?.map((survey) => (
          <div
            key={survey._id}
            className="bg-white border border-gray-300 rounded-lg mb-4 p-4 shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{survey.name}</h3>
              <div className="flex space-x-2">
                <FontAwesomeIcon
                  className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
                  icon={faEdit}
                  onClick={() => handleEditSurvey(survey._id)}
                />
                <FontAwesomeIcon
                  className="text-red-500 cursor-pointer hover:text-red-700 transition"
                  icon={faDeleteLeft}
                  onClick={() => handleDeleteSurvey(survey._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default SurveyItems;
