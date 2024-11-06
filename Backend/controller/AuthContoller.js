const usermodel = require("../models/UserModel");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


// Login Function
const login = async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  try {
    // Find the user by email
    const user = await usermodel.findOne({ email });
    
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Compare the password
    const isEqual = await bcrypt.compare(password, user.password);

    const jwt_token=jwt.sign({email:user.email,_id:user._id},process.env.REACT_APP_JWT_SECRET,{expiresIn:"4h"})
    console.log(jwt_token);

    if (isEqual) {
      return res.status(200).json(
        {
          msg:"Login successfully",
          jwt_token
        }
      )
    } else {
      return res.status(400).send("Incorrect password");
    }
  } catch (error) {
    res.status(500).send("Error during login: " + error.message);
  }
};

// Signup Function
const signup = async (req, res) => {
  const { name, password, email,phoneNo} = req.body;

  try {
    // Check if user already exists
    const existingUser = await usermodel.findOne({ $or: [{ email }, { phoneNo }] });
    
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new usermodel({ name, password: hashedPassword, email,phoneNo });
    await newUser.save();

    return res.status(201).send('User details saved successfully');
  } catch (error) {
    return res.status(500).send('Error saving service details: ' + error.message);
  }
};

module.exports = { login, signup };
