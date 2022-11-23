// get tcp protocol
const net = require('net');
const port = 8080;

// create the server
const server = net.createServer();

// keep track of the clients
const clientList = [];

const broadcast = (clientSender, message, clientList) => {
  for (let client of clientList) {
    if (client !== clientSender) {
      client.write(`${clientSender.name} says: ${message}`);
    }
  }
};

// events are triggered on the server
// establish a connection
// event: connection

server.on('connection', (client) => {
  console.log('A new client is connected to server');

  clientList.push(client);
  console.log(
    `${clientList.length} client(s) ${
      clientList.length === 1 ? 'is' : 'are'
    } now connected`
  );

  // set the encoding to utf-8

  client.setEncoding('utf-8');

  // potentially send back a response
  // method: write

  client.write('Welcome to Bob Squarepants server');

  // a request (message that comes in)
  // event: data
  client.on('data', (msg) => {
    // detect if the msg contains 'setName'
    if (msg.match(/setName/)) {
      // remove the setName from the message
      const clientName = msg.replace(/setName /, '');
      client.name = clientName;
      return;
    }

    broadcast(client, msg, clientList);
  });
});

// server listens for requests
server.listen(port, () => console.log(`TCP Server Running on port ${port}`));
