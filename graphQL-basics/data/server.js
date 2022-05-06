const jsonServer = require("json-server");
//const https = require("https");
const http = require("http");
const path = require("path");
const fs = require("fs");
const pause = require('connect-pause'); // Install: npm install connect-pause

const port = 3000;

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.use(pause(2000));
server.use(router);
// const keyFile = path.join(__dirname, 'key.pem');
// const certFile = path.join(__dirname, 'cert.pem');
// const additionalFile = path.join(__dirname, 'digicert.crt');

// require('ssl-root-cas')
//     .inject()

//     // NOTE: intermediate certificates should be bundled with
//     // the site's certificate, which is issued by the server
//     // when you connect. You only need to add them here if the
//     // server is misconfigured and you can't change it
//     //.addFile(__dirname + '/ssl/Rapid SSL CA.txt')
//     ;

// const sslOptions = {
//     key: fs.readFileSync(keyFile,),
//     cert: fs.readFileSync(certFile),
// };

server
    // .createServer()
    .listen(port, () => {
        console.log(
            'Go to http://localhost:3000/'
        );
});