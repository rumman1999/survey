
import React, { useState } from 'react';

function MyForm({closePopup}) {
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
    if (!themeData.themeOpt || !themeData.themeName || !themeData.themeType || !themeData.fromType || !themeData.allQuestionMandatory || !themeData.enableSkip || !themeData.optionType || !themeData.font || !themeData.color) {
      console.log('Please fill all required fields');
    }else{
      
    // console.log(themeData);
    const themeDataString = JSON.stringify(themeData);
    localStorage.setItem('themeData', themeDataString);
    closePopup();
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="formPart">
        <label htmlFor="themeOpt">Theme</label>
        <br />
        <select
          id="themeOpt"
          name="themeOpt"
          value={themeData.themeOpt}
          onChange={handleInputChange}
        >
          <option value=""> Select </option>
          <option value="normalTheme">Normal</option>
          <option value="darkTheme">Dark Theme</option>
        </select>
      </div>
      <div className="formPart2">
        <div>
          <label htmlFor="themeName">Theme Name</label>
          <br />
          <input
            type="text"
            id="themeName"
            name="themeName"
            value={themeData.themeName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="themeType">Theme Type</label>
          <br />
          <select
            id="themeType"
            name="themeType"
            value={themeData.themeType}
            onChange={handleInputChange}
          >
            <option value=""> Select </option>
            <option value="option1">Survey</option>
          </select>
        </div>
        <div>
          <label htmlFor="fromType">From Type</label>
          <br />
          <select
            id="fromType"
            name="fromType"
            value={themeData.fromType}
            onChange={handleInputChange}
          >
            <option value=""> Select </option>
            <option value="option1">One to One</option>
          </select>
        </div>
        <div>
          <label htmlFor="allQuestionMandatory">All Question mandatory</label>
          <br />
          <select
            id="allQuestionMandatory"
            name="allQuestionMandatory"
            value={themeData.allQuestionMandatory}
            onChange={handleInputChange}
          >
            <option value=""> Select </option>
            <option value="option1">No</option>
            <option value="option2">Yes</option>
          </select>
        </div>
        <div>
          <label htmlFor="enableSkip">Enable Skip</label>
          <br />
          <select
            id="enableSkip"
            name="enableSkip"
            value={themeData.enableSkip}
            onChange={handleInputChange}
          >
            <option value=""> Select </option>
            <option value="option1">Yes</option>
            <option value="option2">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="optionType">Option Type</label>
          <br />
          <select
            id="optionType"
            name="optionType"
            value={themeData.optionType}
            onChange={handleInputChange}
            >
              <option value=""> Select </option>
              <option value="box">Box</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </div>
        </div>
        <div className="formPart3">
          <div>
            <label htmlFor="font">Font</label>
            <br />
            <select
              id="font"
              name="font"
              value={themeData.font}
              onChange={handleInputChange}
            >
              <option value=""> Select </option>
              <option value="roboto">Roboto</option>
              <option value="fantasy">Fantasy</option>
              <option value="ariel">Ariel</option>
            </select>
          </div>
          <div>
            <label htmlFor="color">Color</label>
            <br />
            <select
              id="color"
              name="color"
              value={themeData.color}
              onChange={handleInputChange}
            >
              <option value=""> Select </option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </div>
        </div>
        <div className="my-btn">
          <button className="cancelBtn" onClick={closePopup}>cancel</button>
          <button type="submit" className="saveBtn">
            save
          </button>
        </div>
      </form>
  )
}
export  default MyForm
      
