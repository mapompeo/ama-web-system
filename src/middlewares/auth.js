function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error', 'Faça login para acessar essa página.');
  res.redirect('/auth/login');
}

module.exports = authMiddleware;
