import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/SignIn/Register";
import SignIn from "./components/SignIn/SignIn";
import SurveyItems from "./components/SurveyList/SurveyItems";
import Preview from "./components/Preview/Preview";
import Navigation from "./components/SurveyList/Navigation";
import Sidebar from "./components/SurveyList/Sidebar";
import SurveyForm from "./components/CreateSurvey/SurvyeForm";
import CreateQuestion from "./components/CreateQuestion/createquestion";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="flex flex-col lg:flex-row flex-1">
        <Sidebar />
        {/* Add an outlet for nested routes */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/surveyitems" element={<SurveyItems />} />
            <Route path="/surveyForm" element={<SurveyForm />} />
            <Route path="/createQues" element={<CreateQuestion />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* Apply the layout to these routes */}
        <Route path="*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
