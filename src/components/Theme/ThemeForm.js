import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REACT_APP_API_ENDPOINT = 'https://survey-backend-g0aa.onrender.com';

function MyForm({ closePopup }) {
  const email = localStorage.getItem('email');
  const surveyId = localStorage.getItem('id');

  const [themeData, setThemeData] = useState({
    themeOpt: '',
    themeName: '',
    themeType: '',
    fromType: '',
    allQuestionMandatory: '',
    enableSkip: '',
    optionType: '',
    font: '',
    color: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setThemeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTheme = {
      email,
      surveyId,
      ...themeData,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTheme),
    })
      .then(response => {
        if (response.status === 201) {
          console.log('Created');
        } else if (response.status === 200) {
          console.log('Updated');
        } else {
          throw new Error('Error in creation');
        }
        closePopup(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create or Edit Theme</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="themeOpt" className="mb-2 font-semibold">Theme</label>
          <select
            id="themeOpt"
            name="themeOpt"
            value={themeData.themeOpt}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="normalTheme">Normal</option>
            <option value="darkTheme">Dark Theme</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="themeName" className="mb-2 font-semibold">Theme Name</label>
          <input
            type="text"
            id="themeName"
            name="themeName"
            value={themeData.themeName}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="themeType" className="mb-2 font-semibold">Theme Type</label>
          <select
            id="themeType"
            name="themeType"
            value={themeData.themeType}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="option1">Survey</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="fromType" className="mb-2 font-semibold">From Type</label>
          <select
            id="fromType"
            name="fromType"
            value={themeData.fromType}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="option1">One to One</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="allQuestionMandatory" className="mb-2 font-semibold">All Question Mandatory</label>
          <select
            id="allQuestionMandatory"
            name="allQuestionMandatory"
            value={themeData.allQuestionMandatory}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="option1">No</option>
            <option value="option2">Yes</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="enableSkip" className="mb-2 font-semibold">Enable Skip</label>
          <select
            id="enableSkip"
            name="enableSkip"
            value={themeData.enableSkip}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="option1">Yes</option>
            <option value="option2">No</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="optionType" className="mb-2 font-semibold">Option Type</label>
          <select
            id="optionType"
            name="optionType"
            value={themeData.optionType}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="box">Box</option>
            <option value="dropdown">Dropdown</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="font" className="mb-2 font-semibold">Font</label>
          <select
            id="font"
            name="font"
            value={themeData.font}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="roboto">Roboto</option>
            <option value="fantasy">Fantasy</option>
            <option value="ariel">Ariel</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="color" className="mb-2 font-semibold">Color</label>
          <select
            id="color"
            name="color"
            value={themeData.color}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={closePopup}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default MyForm;
