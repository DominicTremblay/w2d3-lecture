// create the server for our chat
const net = require('net'); // TCP library
const port = 8000;

// create the server

const server = net.createServer();

// We need to handle a few events
//
// - connect
// - incoming message is received from a client
// - catch any errors
// - a client disconnect from the server

const clients = [];

// send a message to all the clients execept the client who initially sent it
const broadcast = (currentClient, message) => {
  for (let client of clients) {
    if (client !== currentClient) {
      client.write(message);
    }
  }
};

// When a client connects
server.on('connection', (client) => {
  console.log('Welcome to our awesome chat!');

  // assigne a name
  client.username = `Anonymous ${clients.length + 1}`;

  // add the client to the list of clients
  clients.push(client);

  // set the encoding
  client.setEncoding('utf8');

  // When a message is received from a client
  client.on('data', (message) => {
    // console.log('Received a message from client:', message);

    // if it's a setName command, change the username
    if (message.match(/setName/)) {
      // removing 'setCommand' from the message
      const name = message.replace(/setName /, '');
      console.log({name});
      const msg = `${client.username} has changed their name to ${name}`;

      // sending the notification to all clients
      broadcast(client, msg);

      client.username = name;
    } else {
      broadcast(client, message);
    }
  });

  // Whenever the is an error
  client.on('error', (err) => console.log(`Error: ${err.message}`));

  client.on('end', () =>
    console.log(`Client ${client.username} has disconnected`)
  );
});

// Have our server listening for connections

server.listen(port, 'localhost', () =>
  console.log(`Server is listening to port ${port}`)
);
