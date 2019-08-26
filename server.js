const net = require('net');
const port = 8000;

const server = net.createServer();

const clients = [];

const broadcast = (message, sender) => {
  clients.forEach(client => {
    // Don't want to send it to sender
    if (client === sender) return;
    client.write(message);
  });
  // Log it to the server output too
  process.stdout.write(message);
};

server.on('connection', connection => {
  console.log('Client connected');
  connection.name = `${connection.remoteAddress}: ${connection.remotePort}`;
  connection.setEncoding('utf8');
  connection.write(`Welcome ${connection.name}`);

  broadcast(`${connection.name} has joined the chat`, connection);

  clients.push(connection);
});

//Add listener for error events
server.on('error', error => {
  console.log(`Error : ${error}`);
});

server.listen(port, () => {
  console.log(`Servers listening on port ${port}`);
});
