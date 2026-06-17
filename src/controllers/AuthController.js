const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AuthController = {
  showLogin(req, res) {
    res.sendFile('pages/login.html', { root: 'views' });
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findByEmail(email);
      if (!user || !(await User.comparePassword(password, user.password))) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      req.session.token = token;
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  logout(req, res) {
    req.session.destroy();
    res.redirect('/auth/login');
  }
};

module.exports = AuthController;
