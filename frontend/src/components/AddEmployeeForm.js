
import React, { useState, useEffect } from 'react';
import { addEmployee, updateEmployee } from '../services/employeeService';
import './AddEmployeeForm.css'; 

const AddEmployeeForm = ({ selectedEmployee, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: ''
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        body: selectedEmployee.body
      });
    } else {
      setFormData({
        name: '',
        email: '',
        body: ''
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, formData);
      } else {
        await addEmployee(formData);
      }
      onFormSubmit();
      setFormData({ name: '', email: '', body: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label>Comment:</label>
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Enter comment"
        ></textarea>
      </div>
      <button type="submit">{selectedEmployee ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
