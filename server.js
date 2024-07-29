// dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
// routes directory
const routes = require("./controllers");
// sequelize
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// initiate express
const app = express();
const PORT = process.env.PORT || 3001;

// set up handlebars.js engine with helpers
const hbs = exphbs.create({ helpers });

// login session
const sess = {
  secret: "Secret",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static files location
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use(routes);

// start the server after establishing a connection to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
