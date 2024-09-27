// src/components/EmployeeCard.js
import React from 'react';
import './EmployeeCard.css'; // Create this CSS file for styling

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p><strong>Email:</strong> {employee.email}</p>
      <p>{employee.body}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(employee)}>Edit</button>
        <button onClick={() => onDelete(employee.id)}>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
