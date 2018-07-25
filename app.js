const express = require("express");
const app=express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Enabling the path to the subspaces of the api

const espacio1Routes = require('./api/routes/espacio1');


//This will log in the console actions being performed on server (LOGS)

app.use(morgan("dev"));


//body parser: makes possible to insert or extract json data in the app

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 


//Cors error avoiding  (allows other webpages to access the API)

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH");
        return res.status(200).json({});
    }
    next();
});


//Redirects every request as: localhost:3000/espacio1/ (directories)...
//...to the directory where the webservices of espacio1 are located

app.use('/espacio1',espacio1Routes);


//This is handling with the request as: localhost:3000 (homepage)

app.use((req, res, next)=> {
    res.status(200).json({
        message: "Alba dirigete en internet a: http://localhost:3000/espacio1"
    });
});


//Error handling: Connection with server failed error (404)

app.use((req, res,next)=>{
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
