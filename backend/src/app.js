require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '..', 'frontend', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ama-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/volunteers', require('./routes/volunteers'));
app.use('/beneficiaries', require('./routes/beneficiaries'));
app.use('/activities', require('./routes/activities'));

// 404
app.use((req, res) => {
  res.status(404).render('pages/error', { title: '404 — Página não encontrada', code: 404, message: 'A página que você procura não existe.' });
});

// Erro interno
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('pages/error', { title: '500 — Erro interno', code: 500, message: 'Algo deu errado no servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
