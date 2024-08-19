import React, { createContext, useEffect, useState } from "react";
const REACT_APP_API_ENDPOINT = "https://survey-backend-g0aa.onrender.com";
// const REACT_APP_API_ENDPOINT='http://localhost:5001'

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [theme, setTheme] = useState("light");
  const [surveyList , setSurveyList] = useState([])
  const [selectedSurveyID , setSelectedSurveyID] = useState(null)  
  const [editingSurvey , setEditingSurvey] = useState(false)

  const [surveyFormData, setSurveyFormData] = useState({
    name: "",
    description: "N/A",
    surveyType: "",
    startDate: "",
    endDate: "",
    criteria: "N/A",
    image: null,
  });

  const [questionsList , setQuestionList] = useState([])

  async function fetchSurveyListData(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("DATA.REST", data.result);
        setSurveyList(data.result);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const fetchSurveyDetails = (selectedSurveyID) => {
    fetch(`${REACT_APP_API_ENDPOINT}/survey/${selectedSurveyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        // setSurveys(data.result);
        console.log(data.result)
        const surveyDetails = data.result
        setSurveyFormData({
          name: surveyDetails.name,
          description: surveyDetails.description,
          surveyType: surveyDetails.surveyType,
          startDate: surveyDetails.startDate,
          endDate: surveyDetails.endDate,
          criteria: surveyDetails.criteria,
          image: surveyDetails.image,
        })
        // return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fetchQuestionsList = (selectedSurveyID) => {
    fetch(`${REACT_APP_API_ENDPOINT}/ques/${selectedSurveyID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.result)
        setQuestionList(data.result)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const addQuestionService =async (body) => {
      const url = `${REACT_APP_API_ENDPOINT}/ques`;
      const requestBody = {
        email: body.email,
        surveyId: body.surveyId,
        questionText: body.questionText,
        option:body.option
      };
      console.log(requestBody)
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Response data:', data);
        return data;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setUser({
        email: email,
        token: token,
      });
      fetchSurveyListData(`${REACT_APP_API_ENDPOINT}/surveys/${email}`)
        .then((data) => {
          // console.log("surveyList", data);
        })
        .catch((error) => {
          console.error("Failed to fetch survey list", error);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSurveyListData(`${REACT_APP_API_ENDPOINT}/surveys/${user.email}`)
      .then((data) => {
        // console.log("surveyList", data);
      })
      .catch((error) => {
        console.error("Failed to fetch survey list", error);
      });
    }
  }, [user]);

  // useEffect(() => {
  //  if(selectedSurveyID){
  //   fetchSurveyDetails()
  //   // fetchQuestionsList()
  //  }
  // }, [selectedSurveyID]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        surveys,
        setSurveys,
        theme,
        setTheme,
        surveyFormData,
        setSurveyFormData,
        surveyList , setSurveyList,
        selectedSurveyID , setSelectedSurveyID,
        editingSurvey , setEditingSurvey,
        questionsList , setQuestionList,
        fetchQuestionsList,fetchSurveyDetails, addQuestionService
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
