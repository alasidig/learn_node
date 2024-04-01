const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200,    { 'Content-Type': 'text/html' });
  res.end('<h1>Welcome to Tasks Management</h1>');
});

const port =  3000;
server.listen(port, 'localhost',() => {
  console.log(`Server running at http://localhost:${port}/`);
});

