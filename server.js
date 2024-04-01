const http = require('http');
const fs = require('fs');
const {handleNew} = require ('./taskHandlers'); // import the function

function sendHTMLFile(res, filePath, statusCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('<h1>Internal server error</h1>');
            return;
        }
        res.writeHead(statusCode, {'Content-Type': 'text/html'});
        res.end(data);
    });
}
const server = http.createServer((req, res) => {
    console.log(req.url);

    switch (req.url) {
        case '/':
            sendHTMLFile(res, './public/welcome.html');
            break;
        case '/task':
            sendHTMLFile(res, './public/task.html');
            break;
        case '/new':
            handleNew(req, res);
            break;
        case '/new-task':
            res.writeHead(302, {'Location': '/new'}); // status code 302 means redirection
            res.end();
            break;
        default:
            sendHTMLFile(res, './public/not-found.html', 404);
            break;
    }
    }
);

const port =  3000;
server.listen(port, 'localhost',() => {
  console.log(`Server running at http://localhost:${port}/`);
});

