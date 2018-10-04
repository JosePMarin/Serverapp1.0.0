//Enable to use the app builder library
const express = require("express");
//Enable to use the app builder function
const app=express();
//Enables logs from the server in the console
const morgan = require("morgan");
//Enables the insertion of data in the app
const bodyParser = require("body-parser");
//MongoDB driver
const mongoose=require("mongoose");
//Enabling the path to the subspaces of the api
const espacio1Routes = require('./api/routes/espacio1');
const espacio2Routes = require('./api/routes/espacio2');


//Connecting to MongoDB in the cloud via url
mongoose.connect("mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW +"@db-fujeb.mongodb.net/test?retryWrites=true",
    {
        useNewUrlParser:true
    }
);

//This will log in the console actions being performed on server (LOGS)
app.use(morgan("dev"));
//body parser: makes possible to insert or extract json data in the app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Cors error avoiding  (allows other APIs to access my API) *= allows any domain to get access
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH");
        return res.status(200).json({});
    }
    next();
});

//CONNECTION TO SUBSPACES OF THE API
//-----------------------------------
//Redirects every request as: localhost:3000/espacio1/ (directories)...
//...to the directory where the webservices of espacio1 are located
app.use('/espacio1',espacio1Routes);
//Redirects every request as: localhost:3000/espacio2/ (directories)...
//...to the directory where the webservices of espacio2 are located
app.use('/espacio2',espacio2Routes);
//-----------------------------------
//Error handling: Connection with server failed error (404)
app.use((req, res, next)=>{
    const error = new Error ("not found");
    error.status = 404;
    next(error);
});
//Error handling: Internal error related with a DB (500)
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports=app;
