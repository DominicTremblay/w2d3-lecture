// get the tcp library
const net = require('net');
const port = 8080;

// create a server
const server = net.createServer();

const connectedClients = [];
const messages = {};

// send message to all clients
const broadcast = (sender, message) => {
  // use the write method on each client in connectedClients
  for (let client of connectedClients) {
    if (client !== sender) {
      client.write(message);
    }
  }
};

// connection event => triggered whenever a client establish a connection to the server
server.on('connection', (client) => {
  //set encoding to utf8
  client.setEncoding('utf8');

  connectedClients.push(client);

  console.log(`Nb of clients: ${connectedClients.length}`);

  console.log('Client is connected');
  client.write("Welcome to Bob's server");

  // assign a default name to the client
  client.name = `Anonymous ${connectedClients.length}`;

  //assign an unique to each client
  client.id = Math.random().toString(36).substring(2, 8);

  // to keep track of the messages coming from the client.
  messages[client.id] = [];

  // data event. whenever a client sends a message.
  client.on('data', (message) => {
    console.log(`${client.name} says: ${message}`);

    if (message.match(/setName/)) {
      client.name = message.replace(/setName /, ''); // removing the setName command
      message = `client has change their name to ${client.name}`;
    }

    //adding the messages to the messages object to track messages - optional
    messages[client.id].push(message);

    // broadcast the received message from a client to all the other clients

    broadcast(client, message);
  });

  client.on('error', (err) => console.log(err.message));

  client.on('close', () => {
    // Todo: I would need to delete the client from connectedClients.
    // could use filter function to do that..

    console.log('client has disconnected')
});

// server needs to listen for incoming requests
server.listen(port, console.log(`Server is listening on port ${port}`));
