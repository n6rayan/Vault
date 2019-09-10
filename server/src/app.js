const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const express = require('express');
const session = require('express-session')
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FileStore = require('session-file-store')(session);
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const helpers = require('./helpers');
const log = require('./logger');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use(session({
  genid: () => {
    return uuidv4(); // use UUIDs for session IDs
  },
  resave: false,
  saveUninitialized: true,
  secret: config.get('session.secret'),
  store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

morgan.token('reqid', req => req.reqid);

app.use((req, res, next) => {
  req.reqid = uuidv1();
  res.set('X-Request-Id', req.reqid);

  next();
});

app.use(
  morgan(
    ":remote-addr - - ':method :url HTTP/:http-version' " +
      ":status :res[content-length] :response-time ':reqid'",
    { stream: log.stream }
  )
);

passport.use(new LocalStrategy(async (username, password, done) => {
  let user;

  try {
    user = await helpers.findUser(username);

    const message = 'Incorrect Credentials!';

    if (!user) {
      return done(null, false, {message: message});
    }

    if (password !== user.password) {
      return done(null, false, {message: message})
    }
  }
  catch (err) {
    return done(err);
  };

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await helpers.findUserById(id);
  done(null, user);
});

app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => log.info(`Server started: http://localhost:${port}/`));