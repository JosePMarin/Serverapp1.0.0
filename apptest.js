const express = require ("express");
const app = express();

//This is handling with the request as: localhost:3000 (homepage)

app.use((req, res, next)=> {
    res.status(200).json({
        message: "It works!"
    });
});

module.exports=app;
