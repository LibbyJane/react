'use strict';

const https = require('https');
const fs = require('fs');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const path = require("path");
const schema = require('./schema/schema');

const app = express();

let server;
const port = 4000;
const keyFile = path.join(__dirname, 'key.pem');
const certFile = path.join(__dirname, 'cert.pem');
const additionalFile = path.join(__dirname, 'digicert.crt');

require('ssl-root-cas')
    .inject()
    .addFile(additionalFile)
    // NOTE: intermediate certificates should be bundled with
    // the site's certificate, which is issued by the server
    // when you connect. You only need to add them here if the
    // server is misconfigured and you can't change it
    //.addFile(__dirname + '/ssl/Rapid SSL CA.txt')
    ;

const sslOptions = {
    key: fs.readFileSync(keyFile,),
    cert: fs.readFileSync(certFile),
};

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rejectUnauthorized: false
}));

server = https.createServer(sslOptions);
server.on('request', app);
server.listen(4000, () => {
    console.log(
        'Go to https://localhost:4000/'
    );
});