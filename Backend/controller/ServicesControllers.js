const servicemodel = require("../models/ServicesModel");

const getServices = async (req, res) => {
    const { certificateName} = req.body;

    const finddoc= await servicemodel.findOne({certificateName});
   
    res.send(finddoc);


};
const getAllServices = async (req, res) => {
    try {
        const services = await servicemodel.find();

        if (services.length === 0) {
            return res.status(404).json({ message: "No services found" });
        }

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const postServices = async (req, res) => {
    const { certificateName, proofOfIdentity, proofOfAddress } = req.body;

    const isexit= await servicemodel.find({certificateName});

    if(isexit){
        res.send("certificat alredy there");
    }

    const servicesdetails = new servicemodel({ certificateName, proofOfIdentity, proofOfAddress });
    servicesdetails.save()
        .then(() => res.status(201).send('Service details saved successfully'))
        .catch((error) => res.status(500).send('Error saving service details: ' + error.message));
    
};

module.exports = { getServices, postServices,getAllServices };
