module.exports = function (req, res, next) {
  if (req.user.role === 'teacher' || req.user.role === 'admin') {
    return next();
  } else {
    res.status(403).send({message: 'Require teacher or admin role to access.'});
  }
};
