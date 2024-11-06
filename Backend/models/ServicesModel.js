// NOT IN USE FOR SOME TIME
const mongoose= require("mongoose")

const serviceSchema= new mongoose.Schema({
    certificateName: {
        type: String,
        required: true,
        unique: true,
      },
      proofOfIdentity: {
        type: [String], // Array of strings for identity documents
        required: true,
      },
      proofOfAddress: {
        type: [String], // Array of strings for address documents
        required: true,
      },

})


const servicemodel=mongoose.model("services",serviceSchema);
module.exports = servicemodel;