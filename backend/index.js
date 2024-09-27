
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store or use a JSON file for persistence
let employees = [];

// Function to load initial data from external API
const loadInitialData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments');
    employees = response.data.map(comment => ({
      id: comment.id,
      name: comment.name,
      email: comment.email,
      body: comment.body
    }));
    console.log('Initial employee data loaded.');
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

// Load data on server start
loadInitialData();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Get all employees
app.get('/employees', (req, res) => {
    res.json(employees);
  });
  
  // Get a single employee by ID
  app.get('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });
  
  // Create a new employee
  app.post('/employees', (req, res) => {
    const { name, email, body } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const newEmployee = {
      id: employees.length ? employees[employees.length - 1].id + 1 : 1,
      name,
      email,
      body: body || ''
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  });
  
  // Update an existing employee
  app.put('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const { name, email, body } = req.body;
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);
  
    if (employeeIndex !== -1) {
      const updatedEmployee = {
        id: employeeId,
        name: name || employees[employeeIndex].name,
        email: email || employees[employeeIndex].email,
        body: body || employees[employeeIndex].body
      };
      employees[employeeIndex] = updatedEmployee;
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });
  
  // Delete an employee
  app.delete('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const initialLength = employees.length;
    employees = employees.filter(emp => emp.id !== employeeId);
    if (employees.length < initialLength) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  });
  