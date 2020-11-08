module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send({message: 'User is unauthorized!'});
  }
};
