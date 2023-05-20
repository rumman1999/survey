import React from "react";
import "./Preview.css";
import PrevQues from "./PrevQues";

function Preview() {
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
    <div className="container">
      <div className="top-part">
        <span className="left-part">&#8592; Preview </span>
        <span>
          {/* <Link className="close" to="/"> */}
            close preview
          {/* </Link> */}
          <button type="save" className="save">
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
  );
}
export default Preview;
