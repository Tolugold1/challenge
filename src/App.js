import React from 'react';
import SignUp from './Components/Signup/signUp';
import SignIn from './Components/Signup/signin';
import DashboardPage from "./Components/Dashboard/Dashboard";
import ChallengePage from './Components/Challenges/ChallengePage';
import PostSchedule from './Components/Post_Scheduler/PostSchedule';
import Details from './Components/Signup/details';
import "./App.styles.scss";
import layout from './Components/layout/layout';
import Nav from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const DashboardApp = layout(DashboardPage);
  const ChallengeApp = layout(ChallengePage);
  const PostScheduleApp = layout(PostSchedule);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/details' element={<Details />} />
          <Route exact path='/home' element={<Nav />}>
            <Route path='/home/dashboard' element={<DashboardApp />} />
            <Route path='/home/challenge' element={<ChallengeApp />} />
            <Route path='/home/postschedule' element={<PostScheduleApp />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;