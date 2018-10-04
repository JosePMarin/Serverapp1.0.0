//Enable to use the app builder library
const express = require("express");
//Enable to use the router function
const router = express.Router();

//Webservices to localhost:3000/espacio2/

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /espacio2"
    });
});

router.post('/',(req, res, next) => {
    const espacio1=new Espacio1({
        _id: new mongoose.Types.ObjectId(),
        attribute1:req.body.attribute1,
        attribute2:req.body.attribute2
    });
    res.status(201).json({
        message: 'Handling POST request to /espacio2',
        createdElemento: elemento        
    });
});

module.exports = router;