const express = require('express');
const { createTask } = require('./models/tasks_array');
const {body, validationResult} = require("express-validator");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('new',{
        subtitle:'New Task'
    });
});


router.post('/',
    body('title').trim().isLength({min: 3}).withMessage('Title must be at least 3 characters long'),
    body('description').trim().isLength({min: 5}).withMessage('Description must be at least 5 characters long'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const {title, description, owner, isPublic} = req.body;
            const errMessages = errors.array().map(err => err.msg);
            console.log(errMessages);
            return res.status(400).render('new', {
                subtitle: 'New Task',
                errMessages,
                title,
                description,
                owner,
                isPublic
            });
        }
        createTask(req.body);
        res.redirect(`/?_sort=desc`);
    });

module.exports = router;
