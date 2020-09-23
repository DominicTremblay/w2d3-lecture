const net = require('net');
const port = 8000;

// Create the net server
const server = net.createServer();

// to store the client connections

let clients = [];

const broadcast = (currentClient, message) => {
  for (let client of clients) {
    const msg = `${client.username} says: ${message}`;
    if (client !== currentClient) {
      client.write(msg);
    }
  }
};

// Setup the events
server.on('connection', (client) => {
  // Set encoding
  client.setEncoding('utf8');

  client.username = `Anonymous ${clients.length + 1}`;

  // add the client to the list

  clients.push(client);

  // Send back a welcome message to client
  client.write(`Welcome to our super chat ${client.username}!`);

  // Catching any messages sent by a client
  client.on('data', (message) => {
    console.log(`Message received from client: ${message}`);

    // Catch if it's the setName command
    if (message.match(/setName/)) {
      const username = message.replace(/setName/, '');
      const notification = `${client.username} has changed their name to ${username}`;
      client.username = username;
      broadcast(client, notification);
    } else {
      broadcast(client, message);
    }
  });

  // Catches errors if any
  client.on('error', (err) => console.log(err.message));

  // When the connection with the client is closed
  client.on('close', () => {
    clients = clients.filter((cl) => cl !== client);
    console.log(`${client.username} is disconected.`);
  });
});

// have the server listening for incoming client connection
server.listen(port, () => console.log(`Server is listening on port #${port}`));
