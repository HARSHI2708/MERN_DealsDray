import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };


  return (
    <nav>
        <div className="logo">
        <img src="https://5.imimg.com/data5/SELLER/Logo/2020/10/SB/MP/VP/15218211/logo-90x90.png" />
      </div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/employee-list">Employee List</Link>
        </li>
      
        <li onClick={handleLogout}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
