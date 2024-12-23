const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  studentName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', UserSchema);
