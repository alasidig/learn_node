const express = require('express');
const router = express.Router();
const {createUser, authenticateUser} = require('../models/tasks_db');
const jwt = require('jwt-simple');

const JWT_SECRET = 'the quick brown fox jumps over the lazy dog';

router.use(express.json());

router.get('/', (req, res) => {
  res.render('auth', {subtitle: 'Authentication'});
});
router.post('/register',  
  async (req, res) => {
    const user = await createUser(req.body);
    if (!user) {
      return res.status(409).json({error: 'User already exists'});
    }
    const token = jwt.encode({username:user.username}, JWT_SECRET);
    res.status(201).json({token});
});

router.post('/login', 
  async (req, res) => {
    const {username, password} = req.body;
    const user = await authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({error: 'Invalid credentials'});
    }
    const token = jwt.encode({username}, JWT_SECRET);
    res.json({token});
});

module.exports = router;

