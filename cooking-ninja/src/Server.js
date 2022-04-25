// https-json-server.js
import jsonServer from 'json-server';
import https from 'https';
import path from 'path';
import fs from 'fs';

export default function Server() {
    const server = jsonServer.create();

const keyFile = path.join('', './cert.pem');
const certFile = path.join('', './key.pem');

console.log('server', server);

https
  .createServer(
    {
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile),
    },
    server
  )
  .listen(2000, () => {
    console.log(
      'Go to https://localhost:2000/'
    );
  });
  return (
    <>
    </>
  )
}

