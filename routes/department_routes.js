// routes/Department.js
const express = require("express");
const router = express.Router();
const Department = require("../models/department");

// Create a new Department
router.post("/", async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all Departments
router.get("/", async (req, res) => {
  try {
    const Departments = await Department.find();
    res.json(Departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one Department by ID
router.get("/:id", async (req, res) => {
  try {
    const Single_Department = await Department.findById(req.params.id);
    if (!Single_Department)
      return res.status(404).json({ message: "Department not found" });
    res.json(Single_Department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an Department by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedDepartment)
      return res.status(404).json({ message: "Department not found" });
    res.json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an Department by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment)
      return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
