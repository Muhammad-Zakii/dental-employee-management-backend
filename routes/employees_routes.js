// routes/Employee.js
const express = require("express");
const router = express.Router();
const Employee = require("../models/employees");

// Create a new Employee
router.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all Employees
router.get("/", async (req, res) => {
  try {
    const Employees = await Employee.find().populate("department");
    res.json(Employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const Single_Employee = await Employee?.findById(req?.params?.id).populate(
      "department"
    );
    if (!Single_Employee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(Single_Employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an Employee by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an Employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee)
      return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
