import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createsurvey.css";
import Sidebar from "../SurveyList/Sidebar";
import Navigation from "../SurveyList/Navigation";
import { GlobalContext } from "../../context/GlobalContext";

const REACT_APP_API_ENDPOINT = "https://survey-backend-g0aa.onrender.com";

const SurveyForm = () => {
  const navigate = useNavigate();
  const { surveyFormData, setSurveyFormData , editingSurvey} = useContext(GlobalContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
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
        console.log(data.result)
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
    <>
      <Navigation />
      <div className="frame">
        <Sidebar />
        <div id="survey">
          <form onSubmit={handleSubmit}>
            <div className="heading-container">
              <h2>Create Survey</h2>
              <div className="button-container">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                {
                  editingSurvey === true ?
                  <button className="cancel-button" onClick={()=>navigate("/createQues")}>
                  Skip
                </button>:""
                }
                <button type="submit" className="next-button">
                  {
                    editingSurvey ? <>Save</>:<>Next</>
                  }
                </button>
              </div>
            </div>
            <hr />
            <div className="form-container">
              <div className="left-side">
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    value={surveyFormData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={surveyFormData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="surveyType">Survey Type:</label>
                  <select
                    id="surveyType"
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
              <div className="right-side">
                <div className="form-field">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    id="startDate"
                    type="date"
                    value={surveyFormData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    id="endDate"
                    type="date"
                    value={surveyFormData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="criteria">Other Criteria:</label>
                  <textarea
                    id="criteria"
                    value={surveyFormData.criteria}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="image">Upload Image:</label>
                  <input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="foot">*After clicking on Next please wait to load</div>
    </>
  );
};

export default SurveyForm;
