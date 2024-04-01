const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);

    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Welcome to Tasks Management</h1>');
            break;
        case '/task':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Details of a task goes here</h1>');
            break;
        case '/new':
            handleNew(req, res);
            break;
        case '/new-task':
            res.writeHead(302, {'Location': '/new'}); // status code 302 means redirection
            res.end();
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Not found</h1>');
    }
});

function handleNew(req, res) {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<form method="post" action="/new">
               <input type="text" name="title" placeholder="Enter a task title">
               <button type="submit">Create</button>
               </form>`);
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            console.log(body)
            const params = new URLSearchParams(body);
            const taskTitle = params.get('title');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`Task ${taskTitle} created successfully`);
        });
    }
}

const port =  3000;
server.listen(port, 'localhost',() => {
  console.log(`Server running at http://localhost:${port}/`);
});

