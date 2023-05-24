import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './createquestion.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SurveyList/Sidebar';
import Theme from '../Theme/Theme';
import Navigation from '../SurveyList/Navigation';
const REACT_APP_API_ENDPOINT='https://survey-backend-g0aa.onrender.com'

const CreateQuestion = () => {
  const email = localStorage.getItem('email')
  const surveyId = localStorage.getItem('id')
  const navigate = useNavigate();
  const preview = (e) => {
    e.preventDefault();
    navigate('/preview');
  };

  const [questionText, setQuestionText] = useState('');
  const [option, setOption] = useState(['option1' , 'option2' , 'option3']);
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    const respond = fetchData(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`)
  },[surveyId])

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  // const handleAddQuestion = () => {
  //   // console.log(surveyId, email, questionText, option);
  //   const newQues = {surveyId, email, questionText, option};
  //       const respond = fetchData(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`)
  //       fetch(`${REACT_APP_API_ENDPOINT}/ques`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(newQues),
  //       })
  //         .then(response => {
  //           if (response.status === 201) {
  //             // console.log('created');
  //           }else if (response.status === 200) {
  //             // console.log('updated');
  //           } else  {
  //             throw new Error('error in creation');
  //           } 
  //         })
  //         .catch(error => {
  //           console.log( error);
  //         });
  //         setQuestionText('')
  //         setOption(['option1' , 'option2' , 'option3'])
  //     // console.log(questions);
      
  // };

  const handleAddQuestion = async () => {
    const newQues = { surveyId, email, questionText, option };
  
    try {
      await fetch(`${REACT_APP_API_ENDPOINT}/ques`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQues),
      });
  
      const updatedQuestions = await fetchData(`${REACT_APP_API_ENDPOINT}/ques/${surveyId}`);
      setQuestions(updatedQuestions.result);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setQuestionText('');
    setOption(['option1', 'option2', 'option3']);
  };
  

  const handleAddOption = () => {
    let newOption = `option${option.length+1}`
    setOption([...option, newOption]);
    // console.log(option);
  };

  const handleRemoveOption = (index) => {
    const updatedOption = [...option];
    updatedOption.splice(index, 1);
    setOption(updatedOption);
  };
  
  function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data.result);
        setQuestions(data.result);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleSave = () => {
    localStorage.removeItem('surveyName');
    localStorage.removeItem('id');
    navigate('/surveyitems')
  };

  return (
    <> <Navigation/>
    <div className="frame">
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

        {/* Render existing questions */}
        <div className="pre">
  {questions.map((question, index) => (
    <div key={question._id} className="question-container">
      <div className="question-wrapper">
        <span className="question-number">{`Q${index + 1}`}</span>
        <span className="question-text">{`Question ${index + 1}:`}</span>
        <div className="existing-ques">
          <input
            className="input-box"
            value={question.questionText}
            disabled
          />
        </div>
      </div>

      {question.option.map((option, optIndex) => (
        <div key={optIndex}>
          <label>
            <input
              type="radio"
              name={`question${question._id}`}
              value={option}
              checked={question.selectedOption === option}
              readOnly // Make the input read-only
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
        <input
          className="input-box"
          value={questionText}
          onChange={handleQuestionTextChange}
          placeholder="Enter your question here"
          required
        />
      </div>
    </div>
    {/* Add option for new question */}
    {option.map((option, index) => (
      <div key={index} className="option">
        <label>
          <input
            type="radio"
            name={`option${index}`}
            value={option}
            defaultChecked={false}
            readOnly // Make the input read-only
          />
          <span>Option{index + 1}</span>
        </label>
        {index === 0 ? (
          <button className="m-btn" onClick={handleAddOption}>
            +
          </button>
        ) : (
          <button className="m-btn" onClick={() => handleRemoveOption(index)}>
            -
          </button>
        )}
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

      </div>
      </div>
      <div className='foot'>*After clicking on Add Button please wait to load</div>
    </>
  );
};

export default CreateQuestion;