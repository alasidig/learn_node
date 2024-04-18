const express = require('express');
const { createTask } = require('./models/tasks_db');
const {body, validationResult} = require("express-validator");
const { loginRequiredMiddleware } = require('./routes/authentication_middlewares');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get('/', loginRequiredMiddleware, (req, res) => {
    res.render('new',{
        subtitle:'New Task',
        owner: req.session.user
    });
});
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage:storage });

router.post('/',
upload.single('image'),
    body('title').trim().isLength({min: 3}).withMessage('Title must be at least 3 characters long'),
    body('description').trim().isLength({min: 5}).withMessage('Description must be at least 5 characters long'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const {title, description, isPublic} = req.body;
            const errMessages = errors.array().map(err => err.msg);
            console.log(errMessages);
            return res.status(400).render('new', {
                subtitle: 'New Task',
                errMessages,
                title,
                description,
                isPublic
            });
        }
        console.log({user:req.session?.user})
        req.body.imageUrl = `/images/${req?.file?.filename ||'logo.svg'}`;
        req.body.owner = req.session.user;
        createTask(req.body);
        res.redirect(`/?_sort=desc`);
    });

module.exports = router;
