import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const REACT_APP_API_ENDPOINT = "https://survey-backend-g0aa.onrender.com";

const SurveyForm = () => {
  const navigate = useNavigate();
  const {user, surveyFormData, setSurveyFormData, editingSurvey } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSurveyFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSurveyFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("email", user.email);
    Object.entries(surveyFormData).forEach(([key, value]) => {
      
      if (value !== null && value !== undefined) {
        submitData.append(key, value);
      }
    });

    try {
      const response = await fetch(`${REACT_APP_API_ENDPOINT}/survey`, {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("id", data.result._id);
        navigate("/createQues");
      } else {
        throw new Error("Survey creation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => navigate("/surveyitems");

  return (
    <div className=" flex justify-center bg-gray-100 h-auto py-5">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-customBlue">Create Survey</h2>
            <div className="flex space-x-3">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={handleCancel}
              >
                Cancel
              </button>
              {editingSurvey && (
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                  onClick={() => navigate("/createQues")}
                >
                  Skip
                </button>
              )}
              <button
                type="submit"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                {editingSurvey ? "Save" : "Next"}
              </button>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col space-y-4">
              <div className="form-field">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={surveyFormData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  id="description"
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={surveyFormData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="surveyType" className="block text-sm font-medium text-gray-700">
                  Survey Type:
                </label>
                <select
                  id="surveyType"
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={surveyFormData.surveyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                  <option value="feedback">Feedback</option>
                  <option value="product">Product</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="form-field">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date:
                </label>
                <input
                  id="startDate"
                  type="date"
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 cursor-text"
                  value={surveyFormData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 cursor-text">
                  End Date:
                </label>
                <input
                  id="endDate"
                  type="date"
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={surveyFormData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">
                  Other Criteria:
                </label>
                <textarea
                  id="criteria"
                  className="mt-1 p-2 block w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={surveyFormData.criteria}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Upload Image:
                </label>
                <input
                  id="image"
                  type="file"
                  className="mt-1 block w-full text-gray-500"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
