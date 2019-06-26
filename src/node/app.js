const express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  env = require('dotenv').config(),
  cors = require('cors'),
  fs = require('fs');
	http = require('http');
	https = require('https');
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
  origin: 'http://localhost:4200',
  preflightContinue: false
};
//use cors middleware
app.use(cors(options));
app.options("*", cors(options));

/*// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/jakubdev.pl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/jakubdev.pl/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/jakubdev.pl/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api', indexRouter);
app.use('/user', usersRouter);

app.listen(4004, () => {
  console.log('Server started');
});

/*httpsServer.listen(4004, () => {
	console.log('Https server running');
});*/

module.exports = app;
