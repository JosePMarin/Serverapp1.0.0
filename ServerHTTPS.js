const https = require('https');
const fs = require('fs');
const app = require("./app");

const options = {
  key: fs.readFileSync('./client-key.pem'),
  cert: fs.readFileSync('./client-cert.pem')
};

const port = process.env.PORT || 3000;

const server= https.createServer(options, app);


server.listen(port)

