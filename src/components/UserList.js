import React from 'react';
import '../Styles/UserList.css';

const UserList = ({ users, deleteUser, editUser }) => {
   
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Designation</th>
          <th>Gender</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>
            <img
                 src={user.file ? `http://localhost:5000/${user.file}` : 'default-image.jpg'}
                alt={`User ${index + 1}`}
                className="user-image"
              />
               
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.designation}</td>
            <td>{user.gender}</td>
            <td>{user.courses.join(', ')}</td>
            <td className="user-actions">
              <button className="edit" onClick={() => editUser(user)}>Edit</button>
              <button className="delete" onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
