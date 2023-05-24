import React, { useState } from 'react';
import './Preview.css';

export default function PrevQues({ ques, index, themeData }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionIndex) => {
    if (selectedOption === optionIndex) {
      setSelectedOption(null);
    } else {
      setSelectedOption(optionIndex);
    }
  };

  const rootClassName = themeData.themeOpt === 'darkTheme' ? 'dark-theme' : '';
  const font = themeData.font || 'default-font'; // Use default font if themeData.font is empty

  return (
    <div className={`prev-ques ${rootClassName}`} style={{ color: themeData.color, fontFamily: font }} key={index}>
      <div className='border'></div>
      <span> Question {index + 1}</span>
      <p>{ques.question}</p>
      {themeData.optionType && themeData.optionType.toUpperCase() === 'DROPDOWN' ? (
        <select className="my-select">
          {ques.option.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        ques.option.map((opt, optionIndex) => (
          <React.Fragment key={optionIndex}>
            <div
              onClick={() => handleOptionClick(optionIndex)}
              className={`circle ${selectedOption === optionIndex ? 'selected' : ''}`}
            ></div>
            <span className="my-option">{opt}</span>
          </React.Fragment>
        ))
      )}
    </div>
  );
}
