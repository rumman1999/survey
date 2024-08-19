import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./createquestion.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SurveyList/Sidebar";
import Theme from "../Theme/Theme";
import Navigation from "../SurveyList/Navigation";
import { GlobalContext } from "../../context/GlobalContext";
const REACT_APP_API_ENDPOINT = "https://survey-backend-g0aa.onrender.com";

const CreateQuestion = () => {
  const navigate = useNavigate();

  const preview = (e) => {
    e.preventDefault();
    navigate("/preview");
  };

  const { questionsList, user, selectedSurveyID, addQuestionService } =
    useContext(GlobalContext);

  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState(questionsList);
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");

  const handleInputChange = (e) => {
    setCurrentOption(e.target.value);
  };

  const addOption = () => {
    if (currentOption.trim() !== "") {
      setOptions((prevOptions) => [...prevOptions, currentOption]);
      setCurrentOption(""); // Clear the input after adding
    }
  };
  const deleteOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleAddQuestion = async () => {
    const email = user.email;
    const newQues = {
      email: email,
      surveyId: selectedSurveyID,
      questionText: questionText,
      option: options,
    };

    setQuestions([...questions, newQues]);

    addQuestionService(newQues);

    // console.log(newQues);

    setQuestionText("");
    setOptions([]);
  };
  const handleSave = () => {
    localStorage.removeItem("surveyName");
    localStorage.removeItem("id");
    navigate("/surveyitems");
  };

  return (
    <>
      <Navigation />
      <div className="frame1">
        <Sidebar />
        <div className="next-page-container">
          <div className="header-container">
            <div className="back-arrow">
              <FontAwesomeIcon icon={faArrowLeft} />
              <h2>Create Questions</h2>
            </div>
            <div className="buttons-container">
              <button className="preview-button" onClick={preview}>
                Preview
              </button>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <Theme />
            </div>
          </div>
          <hr />
          <div className="prev">
            <div className="pre-ques">
              {questions.map((question, index) => (
                <div key={question._id} className="question-container">
                  <div className="question-wrapper">
                    <span className="question-text">{`Question ${
                      index + 1
                    }:`}</span>
                    <div className="existing-ques">{question.questionText}</div>
                  </div>
                  {question.option.map((option, optIndex) => (
                    <div className="optionsCont" key={optIndex}>
                      <div className="option-number">
                        option {optIndex + 1} -
                      </div>
                      <div>{option}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="create-ques">
              {/* Render new question input */}
              <div className="question-container">
                <div className="question-wrappe">
                  <span className="question-number">New Question</span>
                  <div>
                    <textarea
                      className="input-box"
                      value={questionText}
                      onChange={handleQuestionTextChange}
                      placeholder="Enter your question here"
                      required
                    />
                  </div>
                </div>
                {options.map((option, index) => (
                  <li key={index}>
                    <div
                      value={currentOption}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder={`Option ${index + 1}`}
                    >
                      {option}
                    </div>
                    <button onClick={() => deleteOption(index)}>−</button>
                  </li>
                ))}
                <li>
                  <input
                    style={{
                      width: "100%",
                    }}
                    value={currentOption}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="enter option"
                  />
                  <button onClick={addOption}>+</button>
                </li>
              </div>

              {/* Add question button */}
              <div className="centered-container">
                <div>
                  <button className="addbutton" onClick={handleAddQuestion}>
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuestion;
