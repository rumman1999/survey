import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
const REACT_APP_API_ENDPOINT='http://localhost:5001'

const SurveyItems = () => {
    const email = localStorage.getItem('email')
  const navigate = useNavigate();
    const [surveys, setSurveys] = useState([
        {
            id: 1,
            name: "Survey 1",
            type: "Image",
            description: "Description 1",
            startDate: "2023-01-01",
            endDate: "2023-01-10",
        },
        {
            id: 3,
            name: "Survey 2",
            type: "Video",
            description: "Description 2",
            startDate: "2023-02-01",
            endDate: "2023-02-10",
        },
        {
            id: 4,
            name: "Survey 2",
            type: "Type 2",
            description: "Description 2",
            startDate: "2023-02-01",
            endDate: "2023-02-10",
        },
        {
            id: 5,
            name: "Survey 2",
            type: "Video",
            description: "Description 2",
            startDate: "2023-02-01",
            endDate: "2023-02-10",
        },
        {
            id: 6,
            name: "Survey 2",
            type: "Image",
            description: "Description 2",
            startDate: "2023-02-01",
            endDate: "2023-02-10",
        },
        {
            id: 7,
            name: "Survey 2",
            type: "Image",
            description: "Description 2",
            startDate: "2023-02-01",
            endDate: "2023-02-10",
        },
        // Add more survey objects as needed
    ]);
    // const [surveys, setSurveys] = useState([])
    // useEffect(()=>{
    //     const respond = fetchData(`${REACT_APP_API_ENDPOINT}/surveys` , email)
    // } , [])
    const [isEditing, setIsEditing] = useState(false);
    const [editedSurvey, setEditedSurvey] = useState({});
    const [newSurvey, setNewSurvey] = useState({
        id: null,
        name: "",
        type: "",
        description: "",
        startDate: "",
        endDate: "",
    });
    function fetchData(url, email) {
        const apiUrl = new URL(url);
        apiUrl.searchParams.append('email', email);
      
        console.log(apiUrl);
        return fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not OK');
            }
            return response.json();
          })
          .then(data => {
            return data;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
      

    const handleEditSurvey = (surveyId) => {
        const surveyToEdit = surveys.find((survey) => survey.id === surveyId);
        setEditedSurvey(surveyToEdit);
        setIsEditing(true);
    };

    const handleDeleteSurvey = (surveyId) => {
        setSurveys(surveys.filter((survey) => survey.id !== surveyId));
    };

    const handleSaveSurvey = () => {
        if (isEditing) {
            setSurveys(
                surveys.map((survey) =>
                    survey.id === editedSurvey.id ? editedSurvey : survey
                )
            );
            setIsEditing(false);
        } else {
            setSurveys([...surveys, newSurvey]);
            setNewSurvey({
                id: null,
                name: "",
                type: "",
                description: "",
                startDate: "",
                endDate: "",
            });
        }
        
    navigate('/surveyForm')
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedSurvey({});
    };

    return (
        <>
        <Sidebar/>
            <div className="main-list">
                
                <div className="Survey">
                    
                    <div className="list-page">
                        <div className="search">
                            <div >
                                <h2>Survey List <FontAwesomeIcon icon={faSearch} /> </h2>

                            </div>

                            <div className="create">
                                <FontAwesomeIcon icon={faFilter} />
                                <button onClick={handleSaveSurvey}>Create</button>
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
                                {surveys.map((survey) => (
                                    <tr key={survey.id}>
                                        <td className="table-data">{survey.name}</td>
                                        <td className="table-data">{survey.type}</td>
                                        <td className="table-data">{survey.description}</td>
                                        <td className="table-data">{survey.startDate}</td>
                                        <td className="table-data">{survey.endDate}</td>
                                        <td>
                                            {/* <button >
                                                Edit
                                            </button> */}
                                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEditSurvey(survey.id)} />
                                            {/* <button >
                                                Delete
                                            </button> */}
                                            <FontAwesomeIcon icon={faDeleteLeft} onClick={() => handleDeleteSurvey(survey.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {isEditing ? (
                            <>
                                <h3>Edit Survey</h3>
                                <input
                                    type="text"
                                    value={editedSurvey.name}
                                    onChange={(e) =>
                                        setEditedSurvey({ ...editedSurvey, name: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editedSurvey.type}
                                    onChange={(e) =>
                                        setEditedSurvey({ ...editedSurvey, type: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editedSurvey.description}
                                    onChange={(e) =>
                                        setEditedSurvey({
                                            ...editedSurvey,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editedSurvey.startDate}
                                    onChange={(e) =>
                                        setEditedSurvey({
                                            ...editedSurvey,
                                            startDate: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editedSurvey.endDate}
                                    onChange={(e) =>
                                        setEditedSurvey({
                                            ...editedSurvey,
                                            endDate: e.target.value,
                                        })
                                    }
                                />
                                <button onClick={handleSaveSurvey}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SurveyItems;
