import React, { useState } from 'react'
import './Preview.css'

export default function PrevQues({ques , index , themeData}) {
  const [selectedOption, setSelectedOption] = useState(null);
console.log(themeData.color);
  const handleOptionClick = (optionIndex) => {
    if (selectedOption === optionIndex) {
      setSelectedOption(null);
    } else {
      setSelectedOption(optionIndex);
    }
  };
  return (
    <div className='prev-ques' style={{  color: themeData.color ,  }} key={index}>
        
        <div className='border'></div>
        <span> Question {index+1}</span>
    <p>{ques.question}</p>
    {
  themeData.optionType.toUpperCase() === 'BOX' ? (
    ques.options.map((opt, optionIndex) => (
      <React.Fragment key={optionIndex}>
        <div
          onClick={() => handleOptionClick(optionIndex)}
          className={`circle ${selectedOption === optionIndex ? 'selected' : ''}`}
        ></div>
        <span className="my-option">{opt}</span>
      </React.Fragment>
    ))
  ) : (
    <select className="my-select">
    {ques.options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
  
  )
}

    </div>
  )
}
