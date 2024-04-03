const express = require('express');
const nunjucks = require('nunjucks');
const handleNew = require ('./taskHandlers');
const {getTasks, getTaskById } = require('./models/tasks_array');

const app = express();

nunjucks.configure('views', {
    express: app,
});
app.set('view engine', 'njk');

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('welcome', {
        subtitle:'Tasks List',
        tasks: getTasks(),
    });
});

app.get('/task', (req, res) => {
    res.render('task', {
        subtitle: 'Task 1',
        task: getTaskById(1),
    });
});

app.use('/new', handleNew);

app.get('/new-task', (req, res) => {
    res.redirect('/new');
});

app.use((req, res) => {
    res.status(404).render('not-found');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
