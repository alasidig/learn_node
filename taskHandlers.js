const express = require('express');
const { createTask } = require('./models/tasks_array');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('new',{
        subtitle:'New Task'
    });
});

router.post('/', (req, res) => {
    createTask(req.body);
    res.redirect(`/?_sort=desc`);
});

module.exports = router;
