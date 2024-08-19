import React, { useContext, useEffect, useState } from "react";
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
import "./SurveyItems.css";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import { GlobalContext } from "../../context/GlobalContext";

const REACT_APP_API_ENDPOINT = "https://survey-backend-g0aa.onrender.com";
// const REACT_APP_API_ENDPOINT='http://localhost:5001'

const SurveyItems = () => {
  const { surveyList, setSelectedSurveyID, setEditingSurvey , fetchQuestionsList , fetchSurveyDetails } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const handleEditSurvey = (surveyId) => {
    fetchSurveyDetails(surveyId)
    fetchQuestionsList(surveyId)
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
        // setSurveys(data.result);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateSurvey = () => {
    navigate("/surveyForm");
  };

  return (
    <>
      <Navigation />
      <div className="frame">
        <Sidebar />
        <div className="main-list">
          <div className="Survey">
            <div className="list-page">
              <div className="search">
                <div>
                  <h2>
                    Survey List <FontAwesomeIcon icon={faSearch} />{" "}
                  </h2>
                </div>
                <div className="create">
                  <FontAwesomeIcon icon={faFilter} />
                  <button className="save" onClick={handleCreateSurvey}>
                    Create
                  </button>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {surveyList?.map((survey) => (
                    <tr key={survey._id}>
                      <td className="table-data">{survey.name}</td>
                      <td className="table-data">{survey.surveyType}</td>
                      <td className="table-data">{survey.description}</td>
                      <td className="table-data">{survey.startDate}</td>
                      <td className="table-data">{survey.endDate}</td>
                      <td>
                        <FontAwesomeIcon
                          className="edit"
                          icon={faEdit}
                          onClick={() => handleEditSurvey(survey._id)}
                        />
                        <FontAwesomeIcon
                          className="edit"
                          icon={faDeleteLeft}
                          onClick={() => handleDeleteSurvey(survey._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyItems;
