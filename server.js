require('dotenv').config();

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initiate express
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });
// change to const hbs = exphbs.create({ helpers }); when helpers are added

const sess = {
  secret: 'Secret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use(routes);

// Start the server after establishing a connection to the database
sequelize.sync({ force: false }).then(() => {

  app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

  });

});

// testing dotenv by console.log // -- Tien
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
