const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  env = require('dotenv').config(),
  cors = require('cors'),
  logger = require('morgan');

const indexRouter = require('./routes/index'), usersRouter = require('./routes/users');

const db = mongoose.connect('mongodb+srv://netguru:' + process.env.MONGOPASSWORD + '@cluster0-l1aiw.mongodb.net/netguru?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to db');
    }
  });

const app = express();
const options = cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: 'http://localhost:4200',   // Zmienić na stronie
  preflightContinue: false
};
//use cors middleware
app.use(cors(options));
app.options("*", cors(options));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/user', usersRouter);

app.listen(3000, () => {
  console.log('Server started');
});


module.exports = app;
