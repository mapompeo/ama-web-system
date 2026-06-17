require('dotenv').config();
const express      = require('express');
const cookieParser = require('cookie-parser');
const path         = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/dashboard',     require('./middlewares/auth'), require('./routes/index'));
app.use('/api/volunteers',    require('./middlewares/auth'), require('./routes/volunteers'));
app.use('/api/beneficiaries', require('./middlewares/auth'), require('./routes/beneficiaries'));
app.use('/api/activities',    require('./middlewares/auth'), require('./routes/activities'));

// Serve frontend
const frontend = path.join(__dirname, '..', '..', 'frontend');
app.use(express.static(path.join(frontend, 'public')));
app.use(express.static(frontend, { extensions: ['html'] }));

// 404 API
app.use('/api', (req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

// SPA fallback
app.use((req, res) => res.sendFile(path.join(frontend, '404.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

module.exports = app;
