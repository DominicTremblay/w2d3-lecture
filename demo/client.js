// we need the tcp protocol
const net = require('net');
const { faker } = require('@faker-js/faker');

// we need to create the client
const client = net.createConnection({
  port: 8080,
  host: 'localhost',
});

// catch what we type on the keyboard using standard input
process.stdin.on('data', (message) => {
  client.write(message);
});

// set the encoding to utf-8
client.setEncoding('utf-8');

// events
// - connection
client.on('connect', () => {
  const clientName = faker.name.fullName();
  console.log(`${clientName} is connected to server`);

  // client sends a message to server
  client.write(`setName ${clientName}`);
});

// - data (response)
client.on('data', (msg) => {
  console.log({ msg });
});

// - end (close the connection)
client.on('end', () => {
  console.log('Client is disconnected');
});
