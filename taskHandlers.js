

function handleNew(req, res) {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<form method="post" action="/new">
               <input type="text" name="title" placeholder="Enter a task title">
               <button type="submit">Create</button>
               </form>`);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    }
}

function handlePostRequest(req, res) {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const params = new URLSearchParams(body);
        const taskTitle = params.get('title');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`Task ${taskTitle} created successfully`);
    });
}

module.exports = {handleNew}; // export the function
