import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Theme from "../Theme/Theme";
import { GlobalContext } from "../../context/GlobalContext";
import "./createquestion.css"

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

    setQuestionText("");
    setOptions([]);
  };

  const handleSave = () => {
    localStorage.removeItem("surveyName");
    localStorage.removeItem("id");
    navigate("/surveyitems");
  };

  return (
    <div className="flex-1 p-6 pb-0 lg:p-10 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Create Questions</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={preview}
          >
            Preview
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
          <Theme />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col lg:flex-row">
      <div className="flex-1 lg:mr-6 mb-6 lg:mb-0">
  <div className="overflow-y-auto h-full max-h-[610px] scroll-container"> {/* Add this wrapper for scrolling */}
    {questions.map((question, index) => (
      <div key={index} className="p-4 mb-4 bg-gray-100 rounded shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">Question {index + 1}</span>
          <span className="text-gray-500">{question.questionText}</span>
        </div>
        <div className="mt-2">
          {question.option.map((option, optIndex) => (
            <div
              key={optIndex}
              className="flex items-center text-sm mb-2"
            >
              <span className="font-semibold mr-2">
                Option {optIndex + 1}:
              </span>
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

        <div className="flex-1">
          <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              New Question
            </h3>

            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4 resize-none"
              value={questionText}
              onChange={handleQuestionTextChange}
              placeholder="Enter your question here"
            />

            <ul className="mb-4 mt-40 space-y-3">
              {options.map((option, index) => (
                <li key={index} className="flex items-center">
                  <span className="flex-1 text-gray-600">{`Option ${
                    index + 1
                  }: ${option}`}</span>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => deleteOption(index)}
                  >
                    −
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center mb-4">
              <input
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={currentOption}
                onChange={handleInputChange}
                placeholder="Enter option"
              />
              <button
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={addOption}
              >
                +
              </button>
            </div>

            <div className="text-center">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
