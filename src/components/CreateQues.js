import React from 'react'
import Theme from "./Theme/Theme"
import { useNavigate } from 'react-router-dom';

export default function CreateQues() {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/preview')
  }
  return (
    <div>CreateQues
      <Theme/>
      <button type="submit" className="next-button" onClick={handleSubmit}>
          Preview
        </button>
    </div>
  )
}
