// models/department.js
const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Department", DepartmentSchema);
