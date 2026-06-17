const User = require('../models/User');

const AuthController = {
  showLogin(req, res) {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('pages/login', { title: 'Login' });
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);
      if (!user || !(await User.comparePassword(password, user.password))) {
        req.flash('error', 'E-mail ou senha inválidos.');
        return res.redirect('/auth/login');
      }

      req.session.user = { id: user.id, name: user.name, role: user.role };
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      req.flash('error', 'Erro interno. Tente novamente.');
      res.redirect('/auth/login');
    }
  },

  logout(req, res) {
    req.session.destroy();
    res.redirect('/auth/login');
  }
};

module.exports = AuthController;
