const express = require('express');
const nunjucks = require('nunjucks');
const handleNew = require ('./taskHandlers');
const {getTasks, getTaskById } = require('./models/tasks_db');

const app = express();

const session = require('express-session');

app.use(session({
    secret: 's3cr3t',
    resave: false, // don't save session if unmodified
    saveUninitialized: false // don't create session until something stored
}));
nunjucks.configure('views', {
    express: app,
    autoescape:false
});
app.set('view engine', 'njk');

app.use(express.static('public'));
app.get('/', async (req, res) => {
    const sortParam = req.query._sort;
    let tasksToShow = await getTasks(sortParam);
    res.render('welcome', {
        subtitle: 'Tasks List',
        tasks: tasksToShow
    });
});

app.get('/task/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const task = await getTaskById(taskId);
    if (!task) {
      return  res.status(404).render('not-found');
    }

    res.render('task', {
        subtitle: task.title,
        task
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
