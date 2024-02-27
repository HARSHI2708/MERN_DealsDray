import React from 'react';
import CreateUserForm from './CreateUserForm';

const CreateUserModal = ({ closeModal, addUser, selectedUser, updateUser }) => {
    
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <CreateUserForm addUser={addUser} selectedUser={selectedUser} updateUser={updateUser} />
      </div>
    </div>
  );
};

export default CreateUserModal;
