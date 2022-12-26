import React from 'react';
import SignUp from './Components/Signup/signUp';
import SignIn from './Components/Signup/signin';
import DashboardPage from "./Components/Dashboard/Dashboard"
import Details from './Components/Signup/details';
import "./App.styles.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route exact path='/dashboard' element={<DashboardPage />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/details' element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;