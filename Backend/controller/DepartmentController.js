

//controllers/departmentController.js
const Department = require('../models/DepartmentModel');

// Add a new department
const addDepartment = async (req, res) => {
    try {
      const { name, certificates } = req.body;
  
      // Check if a department with the same name already exists
      const existingDepartment = await Department.findOne({ name });
  
      if (existingDepartment) {
        // Merge the existing and new certificates
        const allCertificates = [...existingDepartment.certificates, ...certificates];
  
        // Remove duplicates by comparing the 'name' of each certificate
        const uniqueCertificates = allCertificates.filter((certificate, index, self) => 
          index === self.findIndex((c) => c.name === certificate.name)
        );
  
        // Update the existing department with unique certificates
        existingDepartment.certificates = uniqueCertificates;
        await existingDepartment.save();
  
        return res.status(200).json({ message: 'Department updated successfully', department: existingDepartment });
      }
  
      // Create a new department if it doesn't exist
      const newDepartment = new Department({
        name,
        certificates
      });
  
      await newDepartment.save();
      res.status(201).json({ message: 'Department created successfully', department: newDepartment });
  
    } catch (error) {
      console.error('Error creating or updating department:', error); // Log the error
      res.status(500).json({ error: 'Failed to create or update department' });
    }
  };
  
  

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};



// Add certificates to an existing department without duplicating
const addCertificates = async (req, res) => {
  try {
    const { departmentName, newCertificates } = req.body;

    // Find the department by name
    const department = await Department.findOne({ name: departmentName });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Add new certificates if they don't already exist
    const updatedCertificates = department.certificates;

    newCertificates.forEach(newCert => {
      const exists = updatedCertificates.some(cert => cert.name === newCert.name);
      if (!exists) {
        updatedCertificates.push(newCert);
      }
    });

    // Update the department with the new certificates
    const updatedDepartment = await Department.findOneAndUpdate(
      { name: departmentName },
      { certificates: updatedCertificates },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json({ message: 'Certificates added successfully', department: updatedDepartment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add certificates' });
  }
};

const getProofOfDocuments = async (req, res) => {
  const { certificateName } = req.params;

  try {
    // Find the department that contains the specified certificate
    const department = await Department.findOne({ 'certificates.name': certificateName });

    if (!department) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Find the specific certificate within the department
    const certificate = department.certificates.find(cert => cert.name === certificateName);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found in the department' });
    }

    // Extract proof of identity and proof of address
    const proofOfIdentity = certificate.proofOfIdentity || [];
    const proofOfAddress = certificate.proofOfAddress || [];
    const amount = certificate.amount;

    // Send the response with POI and POA
    res.status(200).json({ proofOfIdentity, proofOfAddress , amount });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports={addDepartment,getDepartments,addCertificates,getProofOfDocuments};