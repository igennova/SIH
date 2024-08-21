const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  // Add any additional fields here
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
