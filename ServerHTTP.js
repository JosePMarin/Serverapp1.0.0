const http=require("http");

//Thats routing to the app or other app if it would exist

const app=require("./app");

//This will set up the port for the localhost

const port=process.env.PORT || 3000;

//This will create a server with the content...
//... of the constant app (which redirects to the file)

const server=http.createServer(app);

server.listen(port); 



//npm start  (for starting server)