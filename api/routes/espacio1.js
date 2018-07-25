const express = require("express");
const router = express.Router();

//Webservices to localhost:3000/espacio1/

router.get('/',(req, res, next) => {
    res.status(200).json({
        message: '...No pienso fregar la casa ...'
    });
});

//La variable "elemento", almacena los post request y los almacena como json...
//...definiendo un json con "name" y "price"

router.post('/',(req, res, next) => {
    const elemento = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST request to /espacio1',
        createdElemento: elemento        
    });
});

//Webservices to localhost:3000/espacio1/id/

router.get('/id/:Id', (req, res, next)=>{
    const id = req.params.Id;
    if(id=="001") {
        res.status(200).json({
            message: "Option1",
            id: id
        });
    }   else {
        res.status(200).json({
            message: "ID accepted"
        });
    }
});

router.patch('/id/:Id',(req, res, next) => {
    res.status(200).json({
        message: 'Updated'
    });
});

router.delete('/id/:Id',(req, res, next) => {
    res.status(200).json({
        message: 'Deleted'
    });
});


module.exports = router;