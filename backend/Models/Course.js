const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Add any additional fields here
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
