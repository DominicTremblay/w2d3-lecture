// create the connection to the server
const net = require('net');
const faker = require('faker');

const port = 8000;

const client = net.createConnection({
  host: 'localhost',
  port: port
});

// catching the keyboard input
process.stdin.on('data', (input) => {
  client.write(input);
});

// set encoding
client.setEncoding('utf8');

// When the client connects to the server
client.on('connect', () => {

  console.log("Connected to server");
  client.username = faker.name.findName();
  client.write(`setName ${client.username}`);

});

// events

// connect to the server

// when a message is received from the server
client.on('data', message => {

  console.log(`${client.username} says: ${message}`);
});

client.on('error', err => console.log(`Error: ${err.message}`));
//error


// disconnected from the server
client.on('end', () => console.log("You are disconnected from server"));