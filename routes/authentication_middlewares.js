const jwt = require('jwt-simple');
const JWT_SECRET = 'the quick brown fox jumps over the lazy dog';
const tokenAuthenticationMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No authentication header provided' });
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.decode(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.username = decodedToken.username;
  next();
};

const loginRequiredMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth');
  }
  next();
};

module.exports = {
  tokenAuthenticationMiddleware,
  loginRequiredMiddleware,
};

