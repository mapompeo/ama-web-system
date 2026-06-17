const jwt    = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'ama-jwt-secret-dev';

module.exports = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Não autenticado' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.clearCookie('token');
    res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
  }
};
