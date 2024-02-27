const express = require('express');
const router = express.Router();
const Employee = require('./Employee');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set your upload directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });



// Get all employees
router.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.find();
      const employeesWithFileURLs = employees.map((employee) => ({
        ...employee._doc,
        file: employee.file ? `http://localhost:5000/${employee.file}` : null,
      }));
      res.json(employeesWithFileURLs);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get employee by ID
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new employee
router.post('/employees', upload.single('file'), async (req, res) => {
    // Access file using req.file
    // Access other form fields using req.body
    try {
      // Your logic to save data to MongoDB
      const newEmployee = new Employee({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        gender: req.body.gender,
        courses: JSON.parse(req.body.courses),
        file: req.file ? req.file.path : null, // Adjust this based on your MongoDB model
      });
  
      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });

// Update employee by ID
router.put('/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete employee by ID
router.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
