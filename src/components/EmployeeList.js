import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CreateUserModal from './CreateUserModal';
import UserList from './UserList';
import "../Styles/EmployeeList.css";
import axios from 'axios';

const EmployeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);

  
  const addUser = (newUser) => {
    fetch('http://localhost:5000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        closeModal();
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/employees/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (user) => {
    setSelectedUser(user);
    openModal();
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`/employees/${updatedUser._id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setUsers(users.map((user) => (user._id === updatedUser._id ? response.data : user)));
      setSelectedUser(null);
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const resetSearch = () => {
    // Refetch the original data when resetting
    fetch(`http://localhost:5000/employees`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setSearchTerm('');
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div>
        <Navbar/>
        <h2>Employee List</h2>
      <button onClick={openModal}>Create User</button>
      <div className="search-container">
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <button onClick={resetSearch} className="reset-button">
          Reset
        </button>
      </div>
      <span>Total Count: {users.length}</span>
      {showModal && (
        <CreateUserModal
          closeModal={closeModal}
          addUser={addUser}
          selectedUser={selectedUser}
          updateUser={updateUser}
        />
      )}
      <UserList users={users} deleteUser={deleteUser} editUser={editUser} />
    </div>
  );
};

export default EmployeeList;
