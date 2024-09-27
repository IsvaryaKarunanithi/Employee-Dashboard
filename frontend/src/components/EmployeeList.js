// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import './EmployeeList.css';

const EmployeeList = ({ onEdit, refresh }) => { // Added refresh prop
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, [refresh]); // Added refresh as a dependency

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list">
      {employees.map(employee => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
