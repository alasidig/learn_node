const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);
    
  switch (req.url) {
    case '/':
      res.writeHead(200,    { 'Content-Type': 'text/html' });
      res.end('<h1>Welcome to Tasks Management</h1>');
      break;
    case '/task':
      res.writeHead(200,    { 'Content-Type': 'text/html' });
      res.end('<h1>Details of a task goes here</h1>');
      break;
    case '/new':
      res.writeHead(200,    { 'Content-Type': 'text/html' });
      res.end('<h1>Task form will be here</h1>');
      break;
    case '/new-task':
      res.writeHead(302, { 'Location': '/new' }); // status code 302 means redirection
      res.end();
      break;
    default:
      res.writeHead(404,    { 'Content-Type': 'text/html' });
      res.end('<h1>Not found</h1>');
  }
});

const port =  3000;
server.listen(port, 'localhost',() => {
  console.log(`Server running at http://localhost:${port}/`);
});

