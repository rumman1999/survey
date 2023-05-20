import React, { useState } from 'react'
import './Preview.css'

export default function PrevQues({ques , index}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionIndex) => {
    if (selectedOption === optionIndex) {
      setSelectedOption(null);
    } else {
      setSelectedOption(optionIndex);
    }
  };
  return (
    <div className='prev-ques' key={index}>
        
        <div className='border'></div>
        <span> Question {index+1}</span>
    <p>{ques.question}</p>
    {
        ques.options.map((opt , optionIndex)=>(
            <>
            <div key={optionIndex}  onClick={() => handleOptionClick(optionIndex)}className={`circle ${selectedOption === optionIndex ? 'selected' : ''}`}></div>
            <span className='my-option'>{opt}</span>
            </>
        ))
    }
    </div>
  )
}
