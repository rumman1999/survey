import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './nextpage.css';

const NextPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };
  const handleAddQuestion = () => {
    // Create a new question object
    const newQuestion = {
      id: questions.length + 1, // Assign a unique ID to the question
      questionText,
      selectedOption,
    };
    setQuestions([...questions, newQuestion]);

    // Clear the input fields after adding the question
    setQuestionText('');
    setSelectedOption('');
  };

    return (
      <div className="next-page-container">
      <div className="header-container">
        <div className="back-arrow">
          
          {/* Add back arrow icon or text here */}
        </div>
        <div className="back-arrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h2>Create Questions</h2>
        <div className="buttons-container">
          <button className="preview-button">Preview</button>
          <button className="save-button">Save</button>
        </div>
      </div>
      <hr />
  
        {/* Buttons */}
        <div>
        <div className="question-container">
          <div className="question-wrapper">
            <span className="question-number">Q1</span>
            <span className="question-text">Question 1:</span>
            <div>
            <textarea
            value={questionText}
            onChange={handleQuestionTextChange}
            placeholder="Enter your question here"
          ></textarea>
            </div>
        
          </div>
          <div>
          <label>
            <input
              type="radio"
              name="question1"
              value="Option 1"
              checked={selectedOption === 'Option 1'}
              onChange={() => handleOptionChange('Option 1')}
            />
            Option 1
          </label>
          </div>
         
          <div>
          <label>
            <input
              type="radio"
              name="question1"
              value="Option 2"
              checked={selectedOption === 'Option 2'}
              onChange={() => handleOptionChange('Option 2')}
            />
            Option 2
          </label>
          </div>
         
          <label>
            <input
              type="radio"
              name="question1"
              value="Option 3"
              checked={selectedOption === 'Option 3'}
              onChange={() => handleOptionChange('Option 3')}
            />
            Option 3
          </label>
        </div>

        <div>
    
          {/* Add radio buttons for question 2 options */}
        </div>
      </div>
  
  
        {/* Add question button */}
        <div class="centered-container"></div>
        <div>
        <button className="addbutton" onClick={handleAddQuestion}>Add Question</button>
        </div>
      </div>
    );
  };
  
  export default NextPage;