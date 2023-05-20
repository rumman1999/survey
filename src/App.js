import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn'
import Register from './components/SignIn/Register'
import SurveyItems from './components/SurveyList/SurveyItems';
import './App.css';

function App() {
  return (
    <div className="App">
      <SurveyItems />
    </div>
  );
}

export default App;
