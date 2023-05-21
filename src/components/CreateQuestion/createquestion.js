import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './createquestion.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SurveyList/Sidebar';
import Theme from '../Theme/Theme';

const CreateQuestion = () => {
  const navigate = useNavigate();
  const preview = (e) => {
    e.preventDefault();
    navigate('/preview');
  };

  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      questionText,
      options: ['Option 1', 'Option 2', 'Option 3'],
      selectedOption: '',
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
  };

  const handleOptionChange = (questionId, option) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return { ...question, selectedOption: option };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    navigate('/surveyItems');
  };

  return (
    <>
      <Sidebar />
      <div className="next-page-container">
        <div className="header-container">
          <div className="back-arrow">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h2>Create Questions</h2>
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

        {/* Render existing questions */}
        {questions.map((question, index) => (
          <div key={question.id} className="question-container">
            <div className="question-wrapper">
              <span className="question-number">{`Q${index + 1}`}</span>
              <span className="question-text">{`Question ${index + 1}:`}</span>
              <div>
                <textarea
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionTextChange(e, question.id)
                  }
                  placeholder="Enter your question here"
                ></textarea>
              </div>
            </div>

            {question.options.map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name={`question${question.id}`}
                    value={option}
                    checked={question.selectedOption === option}
                    onChange={() => handleOptionChange(question.id, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}

        {/* Render new question input */}
        <div className="question-container">
          <div className="question-wrapper">
            <span className="question-number">{`Q${questions.length + 1}`}</span>
            <span className="question-text">{`Question ${questions.length + 1}:`}</span>
            <div>
              <textarea
                value={questionText}
                onChange={handleQuestionTextChange}
                placeholder="Enter your question here"
              ></textarea>
            </div>
          </div>
          {/* Add options for new question */}
          {['Option 1', 'Option 2', 'Option 3'].map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name={`question${questions.length + 1}`}
                  value={option}
                  checked={false}
                  onChange={() => handleOptionChange(questions.length + 1, option)}
                />
                {option}
              </label>
            </div>
          ))}
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
    </>
  );
};

export default CreateQuestion;
