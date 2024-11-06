const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  proofOfIdentity: {
    type: [String],
    required: true
  },
  proofOfAddress: {
    type: [String],
    required: true
  },
  amount:{
    type:Number,
    required:true
  }

});

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  certificates: [certificateSchema] // Array of certificates within each department
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
