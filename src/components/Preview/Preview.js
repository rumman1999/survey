import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Preview.css";
import PrevQues from "./PrevQues";
import Sidebar from "../SurveyList/Sidebar";
import Navigation from "../SurveyList/Navigation";
const REACT_APP_API_ENDPOINT='https://survey-backend-g0aa.onrender.com'

// const REACT_APP_API_ENDPOINT='http://localhost:5001'

function Preview() {
  const navigate = useNavigate()
  const surveyId = localStorage.getItem('id')
  const email = localStorage.getItem('email')

  const [themeData, setThemeData] = useState({});
  const [arr , setArr] = useState([])
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/theme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, surveyId }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 202) {
          return response.json();
        } else {
          throw new Error('Recieved Error');
        }
      })
      .then(data => {
        const token = data;
        console.log(data);
        setThemeData(data);
      })
      .catch(error => {
        console.log('Login failed:', error);
      });
  }, [REACT_APP_API_ENDPOINT]);
  
  useEffect(() => {
    fetchData(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`)
      .then(data => {
        setArr(data.result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [REACT_APP_API_ENDPOINT, surveyId]);
  
  
  

  function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem('id');
    navigate('/surveyitems')
  };
  const handleClose = (e) => {
    e.preventDefault();
    navigate('/createQues')
  }
  return (
    <>
    <Navigation/>
        <div className="frame">
    <Sidebar/>
    <div className="container">
      <div className="top-part">
        <span className="left-part">&#8592; Preview </span>
        <span className="right-part">
            <button type="submit" className="save close" onClick={handleClose}>
            close preview
          </button>
          <button type="submit" className="save" onClick={handleSubmit}>
            save
          </button>
          <span className="myBtn"></span>
        </span>
      </div>
      <div className="pre">
      {
        arr.map((ques , index)=>(
            <PrevQues key={index} ques={ques} index={index} themeData={themeData}/>
        ))
      }
      </div>
    </div>
    </div><div className='foot'>*After clicking on Next please wait to load</div>
    </>
  );
}
export default Preview;
