const net = require('net');

const client = net.createConnection({
  host: '172.17.0.1',
  port: 8000,
});

client.setEncoding('utf8');

client.on('connect', () => {
  console.log('I connected!');
  client.write('Hello world!');
});
client.on('data', data => {
  console.log('Server Says:', data);
});
