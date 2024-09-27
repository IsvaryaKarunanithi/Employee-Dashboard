// src/App.js
import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import AddEmployeeForm from './components/AddEmployeeForm';
import './App.css';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refresh, setRefresh] = useState(false); // To trigger re-fetching

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleFormSubmit = () => {
    setSelectedEmployee(null);
    setRefresh(!refresh); // Toggle to trigger re-fetching
  };

  return (
    <div className="App">
      <h1>Employee Dashboard</h1>
      <AddEmployeeForm selectedEmployee={selectedEmployee} onFormSubmit={handleFormSubmit} />
      <EmployeeList onEdit={handleEdit} refresh={refresh} />
    </div>
  );
}

export default App;
