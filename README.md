# Networking with TCP and HTTP

## Content

- What is networking?
- TCP introduction
- TCP Demo 
- HTTP Fundamentals

## Question: What is the Internet?

- [Internet Model](./internet-network.png)

- The Internet relies on the TCP/IP protocol

> A protocol is a **standard set of rules** that allow electronic devices to **communicate** 📡 with each other. These rules include what type of data may be transmitted, what commands are used to send and receive data, and how data transfers are confirmed.

> You can think of a protocol as a **spoken language**.

## TCP

### An analogy: our mail system

(a) 📨 Writing a letter to somebody:

- you put the letter in an enveloppe
- you put the address on it
- send it through the mail
- the recipient receives the letter

(b) 📨 ✂️ Writing a letter to somebody:

- cutting your letter in 5 pieces
- each part is inserted into its own enveloppe with the same address
- send each enveloppe through the mail
- the recipient needs to wait until all the enveloppes are received
- the recipient can put together all the pieces to have the full letter

### TCP 💻 🔁 💻

- Transmisson Control Protocol
- Messages are broken down into packets and travel over the network to be reassemble

![TCP](./tcp.png)

- Messages are broken down into packets
- Messages contained source and destination address in their header
- Each packet travels through the network independantly
- Packets are reassemble into a full message when reaching destination

### IP

- Internet Protocol
- Address that identifies a computer on the network
- Format xxx.xxx.xxx.xxx

`ping lighthouselabs.com`

### TCP Demo ✨

- We'll create a small chat app with the `net` api of node.
- We need a client `(client.js)` and a server `(server.js)`

#### Overview

##### What should our server.js do 🗼

- creates a tcp server
- listen for connection
- on receipt of a new connection, sends the connected client a welcome message
  then listen for any data subsequently sent through that connection
- on receipt of any data, broadcast that data to all currently connected clients

##### What should our client.js do 💻

- create a tcp connection to our server
  with port and host
- it set it's encoding i.e. how the it interprets server's messages
- When connected, console.log('your connected')
- Whenever it receives (data) message from server, it should display that message to console
- Whenever we type something to console, it should send what we typed to the server

#### Events in JS

- could be: an input from a user, (lots of events in the browser), stdin data

- Events are actions or occurrences that happen in the system you are programming, which the system tells you about so you can respond to them as needed.

- The system will give a signal when an event occurs, so that the appropriate response (that is, a callback function) is taken.

- Events are Asynchronous
  - An Event Handler is a callback function that will be called when an event is triggered.

### Protocols on Top of TCP/IP

Languages that computers program use to communicate with one another (usually over a network)

| Protocol    | Description                                   |
| :---------- | :-------------------------------------------- |
| http        | Browse Web pages                              |
| https       | Browse Web page with encrypted communication  |
| smtp        | Send and receive emails                       |
| imap, pop 3 | Load emails from an inbox                     |
| irc         | Text based chat                               |
| ftp         | File transfers                                |
| ssh         | Secure socket shell with encrypted connection |
| ssl         | low-level secure data transfer used by https  |

- each of these protocols use a default port

| Protocol   | Default port |
| :--------- | :----------- |
| http       | 80           |
| https      | 443          |
| ssh        | 22           |
| postgreslq | 5432         |
| mongodb    | 27017        |

### Client Server Communication

- A client initiates a connection to a server
- Client asks for a resource
- Server sends back a response with the corresponding resource

![Client-Server Communication](./client-server-web.png)

#### Other Type of Communication

- Peer-to-peer: clients establish connections directly to other connections with no central server
- bittorrent

## The Web

- What's happening when I type an address in a browser

### URL

- Uniform Resource Locator
- Anatomy of an URL

![URL](./url.png)

### http Protocol

- hypertext transfer protocol
- how a web browser (client) communications with a web server (server)
- The client initiates a request and the server sends back a response

![Client-Server Web](./client-server-web.png)

[List of http status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

#### http verbs

- http requests begin with a verb

(CRUD)

👉 Create
👉 Read
👉 Update
👉 Delete

1️⃣ **`Get`** - get a resource (Read)
2️⃣ **`Post`** - send a resource (Create)
3️⃣ **`Put`** - Update a resource (Update)
4️⃣ **`Delete`** - delete a resource (Delete)

- http requests and response both have a _header_ and a _body_

#### http Headers

- Headers use key value pairs

`key: value`

##### Request Headers

```
GET /www.google.com/search?q=bootcamp HTTP/1.1
Host: www.google.com
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive: 300
Connection: keep-alive
Cookie: USERID=r2t5uvjq435r4q7ib3vtdjq120
Pragma: no-cache
Cache-Control: no-cache
Cookies: key:value string
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
```

##### Post Request - Headers + Body

```
POST /www.lighthouselabs.com/register HTTP/1.1
Host: www.google.com
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Keep-Alive: 300
Connection: keep-alive
Cookie: USERID=r2t5uvjq435r4q7ib3vtdjq120
Pragma: no-cache
Cache-Control: no-cache
Cookies: key:value string
user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
Content-Type: application/json

{
  "first_name": "Bob",
  "last_name": "Squarepants",
  "email": "spongebob@squarepant.com",
}
```

##### Response

```
cf-ray: 498512599e9bab66-YYZ
content-encoding: br
content-type: text/html
date: Sun, 13 Jan 2019 04:20:40 GMT
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
last-modified: Thu, 10 Jan 2019 21:35:48 GMT
server: cloudflare
status: 200

<!DOCTYPE html>
<html>
  <head>
    <title>Canada&#39;s Leading Coding Bootcamp - Lighthouse Labs</title>
    <style>
  @font-face{
  	font-family: 'proxima-nova';
  	font-weight: normal;
  	font-style: normal;
...
```
#### Tools 🧰

Besides the browser, these tools allow us to manage requests.

- Curl
- Postman
- Insomnia

##### Curl

- Curl to get HTML page

`curl https://www.lighthouselabs.ca`

- To get only the request headers:

`curl -I https://www.lighthouselabs.ca`

```
HTTP/1.1 200 OK
Date: Sun, 13 Jan 2019 17:18:50 GMT
Content-Type: text/html
Connection: keep-alive
Set-Cookie: __cfduid=d0133a361d013d048eba721fe79b64df51547399930; expires=Mon, 13-Jan-20 17:18:50 GMT; path=/; domain=.lighthouselabs.ca; HttpOnly
Last-Modified: Thu, 10 Jan 2019 21:35:48 GMT
Expect-CT: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
Server: cloudflare
CF-RAY: 4989863fde7fab90-YYZ
```

## References

- [TCP](https://www.javatpoint.com/computer-network-tcp-ip-model)
