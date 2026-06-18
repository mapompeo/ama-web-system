require('dotenv').config();
const express      = require('express');
const cookieParser = require('cookie-parser');
const path         = require('path');
const rateLimit    = require('express-rate-limit');
const fileUpload   = require('express-fileupload');

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/login', loginLimiter);

app.use('/api/auth',          require('./routes/auth'));
app.use('/api/dashboard',     require('./middlewares/auth'), require('./routes/index'));
app.use('/api/animais', require('./middlewares/auth'), require('./routes/animals'));
app.use('/api/activities',    require('./middlewares/auth'), require('./routes/activities'));
app.use('/api/animal-records', require('./middlewares/auth'), require('./routes/animalRecords'));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => res.redirect('/login'));

const frontend = path.join(__dirname, '..', '..', 'frontend');

app.get('/animais/:id([0-9]+)', (req, res) => res.sendFile(path.join(frontend, 'animais-form.html')));
app.get('/atividades/:id([0-9]+)',    (req, res) => res.sendFile(path.join(frontend, 'atividades-form.html')));
app.get('/historico/:id([0-9]+)', (req, res) => res.sendFile(path.join(frontend, 'historico.html')));

app.use(express.static(path.join(frontend, 'public')));
app.use(express.static(frontend, { extensions: ['html'] }));

app.use('/api', (req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

app.use((req, res) => res.sendFile(path.join(frontend, '404.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

module.exports = app;
