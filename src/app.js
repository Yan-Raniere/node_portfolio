const express      = require('express');
const path         = require('path');
const session      = require('express-session');
const pgSession    = require('connect-pg-simple')(session);
const methodOverride = require('method-override');
const db           = require('./db');

const publicRoutes = require('./routes/public');
const blogRoutes   = require('./routes/blog');
const adminRoutes  = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
  store: new pgSession({
    pool: db,
    tableName: 'sessions',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'dev-secret-mude-em-producao',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  },
}));

app.use('/', publicRoutes);
app.use('/blog', blogRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => res.status(404).render('404'));

module.exports = app;
