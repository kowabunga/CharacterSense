const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, unauthorized' });
  }

  try {
    //verify token and add it to request
    const verifiedToken = jwt.verify(token, process.env.SECRET);

    req.userId = verifiedToken.userId;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
