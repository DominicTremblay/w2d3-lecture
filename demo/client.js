// we need the net library
const net = require('net');
const faker = require('faker');
const remotePort = 8080;
const remoteHost = 'localhost';
// create a connection to the tcp server
const client = net.createConnection({
  port: remotePort,
  host: remoteHost,
});

// todo
// catch the input from the keyboard and send what's typed to server.
// process.stdin.on('data)...



// set the conding to utf8

client.setEncoding('utf8');

// this is happening when the client established a connection to the server
client.on('connect', () => {
  console.log('Connected to server');
  client.write(`setName ${faker.name.findName()}`);
});

// data is happening when the client receives a message from the server
client.on('data', (message) => {
  console.log(message);
});

client.on('error', (err) => console.log(err.message));

client.on('end', () => console.log('Client disconnected from server'));
