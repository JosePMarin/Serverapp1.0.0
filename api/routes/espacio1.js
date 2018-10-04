//Enable to use the app builder library
const express = require("express");
//Enable to use the router function
const router = express.Router();
//Enable to use MongoDB driver
const mongoose=require("mongoose");
//Enable to use the library of the models folder refered to this subspace
const Espacio1=require("../models/espacio1");

//Webservices to localhost:3000/espacio1/

router.get('/',(req, res, next) => {
    Espacio1.find()
    .exec()
    .then(docs => {
        console.log(docs);
        // if(docs.length>=0){
        res.status(200).json(docs);
        res.json({message: "Handling Get request to espacio1"});            
        // }else{
        //     res.status(404).json({
        //         message: "No entries found"
        //     });
        // }
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

//La variable "Espacio1", almacena los post request y los almacena como json
router.post('/',(req, res, next) => {
    
    //Este constructor llama al model referente a espacio1 como esquema de datos valido
    const espacio1=new Espacio1({
        _id: new mongoose.Types.ObjectId(),
        attribute1: req.body.attribute1,
        attribute2: req.body.attribute2
    });
    //Permite guardar datos de acuerdo al model de Espacio1 y con try-catch
    espacio1
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST request to /espacio1',
            createdEspacio1: result
        });       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    
});

//Webservices to localhost:3000/espacio1/:id

//exec() executes the query to the DB
router.get('/:Id', (req, res, next)=>{
    const id = req.params.Id;
    Espacio1.findById(id)  // es Espacio1 porque es el metodo del objeto de model
    .exec()  //ejecuta el query
    .then(docs => {
        console.log("From DB:",docs);
        if(docs){
            res.status(200).json(docs);
        } else {
            res.status(404).json({message:"No valid id entry"})
        }
    })
    .catch(err =>{
         console.log(err);
         res.status(500).json({
             error: err
         }); 
    });

//Dummy code
//     if(id=="001") {
//         res.status(200).json({
//             message: "Option1",
//             id: id
//         });
//     }   else {
//         res.status(200).json({
//             message: "ID accepted"
//         });
//     }
});

router.patch('/:Id',(req, res, next) => {
    const id=req.params.Id;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.propAttribute1]=ops.value;
    }
    Espacio1.update({_id: id},{ $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    // res.status(200).json({
    //     message: 'Updated'
    // });
});

router.delete('/:Id',(req, res, next) => {
        const id= req.params.Id;
    Espacio1.remove({_id: id })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});})
module.exports=router;