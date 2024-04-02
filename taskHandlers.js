const express = require('express');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.send(`<form method="post" action="/new">
    <input type="text" name="title" placeholder="Enter a task title">
    <button type="submit">Create</button>
    </form>`);
});

router.post('/', (req, res) => {
    const taskTitle = req.body.title;
    res.send(`Task ${taskTitle} created successfully`);
});

module.exports = router;
