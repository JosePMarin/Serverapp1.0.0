//Enable to use the app builder library
const express = require("express");
//Enable to use the router function
const router = express.Router();
//Enable to use MongoDB driver
const mongoose=require("mongoose");
//Enable to use the library of the models folder refered to this subspace
const Espacio1=require("../models/espacio1");

//Webservices to localhost:3000/espacio1/ -> Coge todos los elementos de la DB

router.get('/',(req, res, next) => {
    Espacio1.find()
    .select("_id attribute1 attribute2") // selecciona que atributos van a pasarse (de cada elemento) en el json de respuesta desde la DB
    .exec() //ejecuta la Query
    .then(docs => {   //Prepara la respuesta donde además de la informacion de la DB mandamos info adicional
        const response = { //configuramos lo que va a ir en la respuesta
            count: docs.length, //contador de objetos
            espacio1: docs.map(doc=>{ //mapeo de los attributos, etc. que va a llevar la respuesta, haciendo un JsonArray con la respuesta de la DB y +info
                return {
                    _id: doc._id,
                    attribute1: doc.attribute1,
                    attribute2: doc.attribute2,
                    request: {   //nivel inferior
                        type: "GET",
                        url: "localhost:3000/espacio1/"+doc._id
                    }
                }
            })            
        };
        console.log("From DB",response);
        // if(docs.length>=0){
        res.json(response); //Ejecuta la respuesta || solo un parametro puede ser devuelto como json
        res.status(200);
                    
        // }else{}
        //     res.status(404).json({
        //         message: "No entries found"
        //     });
        // }
    })
    .catch(err=> {
        console.log(err);
        res.json({
            error:err
        });
        res.status(500);
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
    .save()  // guardamos el body parseado de la POST request
    .then(result => {  //Preparamos una respuesta del servidor ante la peticion de POST
        console.log(result);
        res.status(201).json({  //Preparamos el mensaje de retorno 
            message: "Created element",
            createdEspacio1: { //Creamos un objeto donde mapeamos el body del post y preparamos la respuesta del servidor al POST
                attribute1: result.attribute1,
                attribute2: result.attribute2,
                _id: result._id,
                request: {
                    type: "POST",
                    url: "localhost:3000/espacio1/"+result._id
                }
            }
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
    .select("_id attribute1 attribute2") // selecciona que atributos van a pasarse (de cada elemento) en el json de respuesta desde la DB
    .exec()  //ejecuta el query
    .then(docs => {
        console.log("From DB:",docs);
        if(docs){
            res.status(200).json({
                espacio1: docs,
                request: {   //nivel inferior
                    type: "GET",
                    description: "Get_prodcut_by_id",
                    url: "localhost:3000/espacio1/"+docs._id
                }
            });
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
    const id=req.params.Id;         //se requiere parametro tipo id para encontrar el elemento (en la DB)
    const updateOps ={};            // se prepara un array con los updates para el elemento( en la DB)
    for (const ops of req.body){    //se recorren los parametros el body del elemento
        updateOps[ops.propAttribute1]=ops.value; //se modifican los attributos por Update[key]= value y se guardan en el array
    }
    Espacio1.update({_id: id},{ $set: updateOps })  //se hace un update del elemento matcheado por id y aplicando el array
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : "Element updated!",
            request: {
                type: "PATCH",
                url: "localhost:3000/espacio1/"+id
            }
        })
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