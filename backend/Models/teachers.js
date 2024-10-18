  const mongoose = require("mongoose");

  const teacherSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    chargePerHour: {
      type: Number,
      required: true,
      min: 0,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    photo: {
      type: String,  // Store the URL to the teacher's photo
      required: true,
    },
  });

  const Teacher = mongoose.model("Teacher", teacherSchema);

  module.exports = Teacher;
