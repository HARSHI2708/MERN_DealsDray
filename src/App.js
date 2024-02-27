import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';


function App() {
  return (
    <Router>
      
      <div className="App">
        <div className="container mt-5">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
