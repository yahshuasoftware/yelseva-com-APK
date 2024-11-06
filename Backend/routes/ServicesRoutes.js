const express = require("express");
const { getServices,postServices,getAllServices } = require("../controller/ServicesControllers");

const router= express.Router();


router.get('/getServices',getServices);
router.post('/addServices',postServices)
router.get('/getAllServices', getAllServices)


module.exports=router;