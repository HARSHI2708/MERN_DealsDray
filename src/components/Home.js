import React from "react";
import Navbar from './Navbar';
import "../Styles/Home.css"; 

function Home() {
  
    const queryParams = new URLSearchParams(window.location.search);
    const userEmail = queryParams.get("userEmail") || "";

  return (
    <div className="welcome">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Dashboard</h2>
            <h3>Hi {userEmail}!</h3>

            <div className="centered-text">
              <p>Welcome To Admin Panel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
