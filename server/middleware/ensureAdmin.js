module.exports = function (req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  } else {
    res.status(403).send({message: 'Require admin role to access'});
  }
};
