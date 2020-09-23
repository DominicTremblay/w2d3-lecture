const net = require('net');
const faker = require('faker');

const client = net.createConnection({
  host: 'localhost',
  port: 8000,
});

client.setEncoding('utf8');

// catch what we type on the keyboard using standard input
process.stdin.on('data', (message) => {
  client.write(message);
});

// Event triggered when client connects to server
client.on('connect', () => {
  console.log('Client is connected to server');
  client.write(`setName ${faker.name.findName()}`);
});

// Event that handles incoming message from server
client.on('data', (message) => {
  console.log(message);
});

// event handler for error
client.on('error', (err) => console.log(`Error: ${err.message}`));

// event handler for disconnection
client.on('end', () => console.log(`Client disconnected from server`));
