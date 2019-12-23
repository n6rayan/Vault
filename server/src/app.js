const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const uuidv1 = require('uuid/v1');

const log = require('./logger');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(helmet());

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

// Include Passport.js code
require('./passport');

app.use('/api', routes);

const port = process.env.PORT || 3001;

app.listen(port, () => log.info(`Server started: http://localhost:${port}/`));
