import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Preview.css";
import PrevQues from "./PrevQues";
import Sidebar from "../SurveyList/Sidebar";

function Preview() {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/createQues')
  }
  const handleClose = (e) => {
    e.preventDefault();
    navigate('/createQues')
  }
  let arr = [
    {question:'Do you feel comfortable asking for help when you’re stuck?',
    options:["true" , "false"]
},{question:'Do you trust your manager to listen',
options:["true" , "false" ,'untrue']
},{question:'Are you familiar with the company goals?',
options:["true" , "false" ]
},{question:'Are you familiar with the company goals?',
options:["true" , "false" ]
},{question:'Are you familiar with the company goals?',
options:["true" , "false" ]
}
  ];
  return (
    <>
    <Sidebar/>
    <div className="container">
      <div className="top-part">
        <span className="left-part">&#8592; Preview </span>
        <span>
            <button type="submit" className="save close" onClick={handleSubmit}>
            close preview
          </button>
          <button type="submit" className="save" onClick={handleSubmit}>
            save
          </button>
          <span className="myBtn"></span>
        </span>
      </div>
      {
        arr.map((ques , index)=>(
            <PrevQues ques={ques} index={index}/>
        ))
      }
    </div>
    </>
  );
}
export default Preview;
