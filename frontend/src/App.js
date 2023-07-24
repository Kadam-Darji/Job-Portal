import "./App.css";
import HomeScreen from "./component/HomeScreen";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginS from "./component/LoginS";
import LoginC from "./component/LoginC";
import SignupC from "./component/SignupC";
import SignupS from "./component/SignupS";
import Navbar from "./component/Navbar";
import Job from "./component/Jobs";
import JobState from "./context/jobcontext/JobState";
import PostJob from "./component/PostJob";
import ProfileC from "./component/ProfileC";
import ProfileS from "./component/ProfileS";
import Alert from "./component/Alert";
import Recruitment from "./component/Recruitment";
import ChangePassword from "./component/ChangePassword";
import ReviewPage from "./component/Review";
import VerifyS from "./component/VerifyS";
import FinishVerify from "./component/finishVerify";
function App() {

  return (
    <Router>
    <JobState>
    <div className="App alert-container">
    <Navbar/>
    <Alert/>
    <Routes>
        <Route path="/" element={<HomeScreen/>} />
    </Routes>
    <Routes>
        <Route path="/signup/company" element={<SignupC/>} />
    </Routes>
    <Routes>
        <Route path="/auth/company" element={<LoginC/>} />
    </Routes>
    <Routes>
        <Route path="/student/signup" element={<SignupS/>} />
    </Routes>
    <Routes>
        <Route path="/student/verify" element={<VerifyS/>} />
    </Routes>
    <Routes>
        <Route path="/auth/student" element={<LoginS/>} />
    </Routes>
    <Routes>
        <Route path="/job" element={<Job/>} />
    </Routes>
    <Routes>
        <Route path="/postjob" element={<PostJob/>} />
    </Routes>
    <Routes>
        <Route path="/company/Profile" element={<ProfileC/>} />
    </Routes>
    <Routes>
        <Route exact path="/review/:jobid" element={<ReviewPage/>} />
    </Routes>
    <Routes>
        <Route path="/student/Profile" element={<ProfileS/>} />
    </Routes>
    <Routes>
        <Route path="/student/finishVerify" element={<FinishVerify/>} />
    </Routes>
    <Routes>
        <Route path="/myJobs" element={<Recruitment/>} />
    </Routes>
    <Routes>
        <Route path="/password" element={<ChangePassword/>} />
    </Routes>
    </div>
    </JobState>
    </Router>
  );
}

export default App;