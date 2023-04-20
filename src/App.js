import React from 'react';
import SignUp from './Components/Signup/signUp';
import SignIn from './Components/Signup/signin';
import DashboardPage from "./Components/Dashboard/Dashboard";
import ChallengePage from './Components/Challenges/ChallengePage';
import PostSchedule from './Components/Post_Scheduler/PostSchedule';
import Details from './Components/Signup/details';
import { Route, useRoutes, BrowserRouter as Router } from "react-router-dom";
import layout from './Components/layout/layout';


const App = () => {

  const DashboardApp = layout(DashboardPage);
  const ChallengeApp = layout(ChallengePage);
  const PostScheduleApp = layout(PostSchedule);

  const MainRoute = () => {
    const routes = useRoutes([
      { path: '/', element: <SignIn /> },
      {path: '/dashboard', element: <DashboardApp />},
      {path: '/signin', element: <SignIn />},
      {path: '/signup', element: <SignUp />},
      {path: '/details', element: <Details />},
      {path: '/challenge', element: <ChallengeApp />},
      {path: '/postschedule', element: <PostScheduleApp />},
      {path: "*", element: <SignIn />}
    ])

    return routes
  }

  return (
    <>
    <Router>
      <MainRoute />
    </Router>
    </>
  );
}

export default App;
