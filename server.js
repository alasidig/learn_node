const express = require('express');
const {handleNew} = require ('./taskHandlers');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/welcome.html');
});

app.get('/task', (req, res) => {
    res.send('<h1>Details of a task goes here</h1>');
});

app.get('/new', handleNew);

app.get('/new-task', (req, res) => {
    res.redirect('/new');
});

app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/public/not-found.html');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
