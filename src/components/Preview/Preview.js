import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import "./Preview.css"; // Ensure you include any specific styles or you can refactor to use Tailwind CSS classes.

function Preview() { 
  const { questionsList } = useContext(GlobalContext);
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem('id');
    navigate('/surveyitems');
  };
  
  const handleClose = (e) => {
    e.preventDefault();
    navigate('/createQues');
  };
  
  return (
    <div className="flex-1 p-6 lg:p-10 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <div className="flex space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleClose}
          >
            Close Preview
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
      
      <hr className="my-4" />
      
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 lg:mr-6 mb-6 lg:mb-0">
          <div className="overflow-y-auto h-full max-h-[610px] scroll-container"> {/* Adjust the height and scrolling */}
            {questionsList.map((ques, index) => (
              <div key={index} className="p-4 mb-4 bg-gray-100 rounded shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Question {index + 1}</span>
                  <span className="text-gray-500">{ques.questionText}</span>
                </div>
                <div className="mt-2">
                  {ques.option.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center text-sm mb-2">
                      <span className="font-semibold mr-2">Option {optIndex + 1}:</span>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1">
          {/* Placeholder for any additional content */}
        </div>
      </div>
    </div>
  );
}

export default Preview;
