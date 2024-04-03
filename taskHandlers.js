const express = require('express');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('new');
});

router.post('/', (req, res) => {
    const taskTitle = req.body.title;
    res.send(`Task ${taskTitle} created successfully`);
});

module.exports = router;
