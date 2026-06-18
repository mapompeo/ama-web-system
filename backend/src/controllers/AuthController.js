const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const SECRET      = process.env.JWT_SECRET || 'ama-jwt-secret-dev';
const COOKIE_OPTS = { httpOnly: true, sameSite: 'strict', maxAge: 8 * 60 * 60 * 1000 };

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user || !(await User.comparePassword(password, user.password))) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
      }
      const payload = { id: user.id, name: user.name };
      const token   = jwt.sign(payload, SECRET, { expiresIn: '8h' });
      res.cookie('token', token, COOKIE_OPTS);
      res.json({ user: payload });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro interno. Tente novamente.' });
    }
  },

  logout(req, res) {
    res.clearCookie('token');
    res.json({ ok: true });
  },

  me(req, res) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Não autenticado' });
    try {
      const { id, name } = jwt.verify(token, SECRET);
      res.json({ user: { id, name } });
    } catch {
      res.clearCookie('token');
      res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
    }
  }
};
