import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/SignIn/Register';
import SignIn from './components/SignIn/SignIn'
import SurveyItems from './components/SurveyList/SurveyItems'
import SurveyForm from './components/CreateSurvey/createsurvey'
import CreateQues from './components/CreateQues';
import Preview from "./components/Preview/Preview"


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/surveyItems" element={<SurveyItems />} />
        <Route path="/surveyForm" element={<SurveyForm />} />
        <Route path="/createQues" element={<CreateQues />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Router>
  );
}


export default App;
