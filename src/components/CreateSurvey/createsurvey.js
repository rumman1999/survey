import React, { useState, } from 'react';
import './createsurvey.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../SurveyList/Sidebar';
import Navigation from '../SurveyList/Navigation';
const REACT_APP_API_ENDPOINT='http://localhost:5001'


const SurveyForm = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('N/A');
  const [surveyType, setSurveyType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [criteria, setCriteria] = useState('N/A');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const email = localStorage.getItem('email')
  // console.log(email);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('description', description);
      formData.append('surveyType', surveyType);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('criteria', criteria);
      formData.append('image', image);
      fetch(`${REACT_APP_API_ENDPOINT}/survey`, {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Survey creation failed');
          }
        })
        .then(data => {
          console.log(data.result._id);
          localStorage.setItem('id', data.result._id);
          return data;
        })
        .catch(error => {
          console.error(error);
        });
      
    navigate('/createQues');
  };
  
  const handleCancle = (e) =>{
    navigate('/surveyitems')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (<>
    <Navigation/>
        <div className="frame">
        
        <Sidebar/>
    <div id="survey">
    <div className="heading-container">
      <h2>Create Survey</h2>
      <div className="button-container">
        <button type="button" className="cancel-button" onClick={handleCancle}>
          Cancel
        </button>
        
        <button type="submit" className="next-button" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
    <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="left-side">
          <div className="form-field">
  <label htmlFor="name">Name:</label>
  <input
    type="text"
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Survey Name"
    required
  />
</div>


            <div className="form-field">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              ></textarea>
            </div>

            <div className="form-field">
              <label htmlFor="surveyType">Survey Type:</label>
              <select
                id="surveyType"
                value={surveyType}
                onChange={(e) => setSurveyType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="feedback">Feedback</option>
                <option value="product">Product</option>
              </select>
            </div>
          </div>

          <div className="right-side">
            <div className="form-field">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="criteria">Other Criteria:</label>
              <textarea
                id="criteria"
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                placeholder="Enter Here"
                required
              ></textarea>
            </div>

            <div className="form-field">
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  </>
    
  );
};

export default SurveyForm;
