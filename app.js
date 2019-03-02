var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var proxy = require('http-proxy-middleware');

var proxyServer = process.env.OKTA_SERVER;

// TODO: failed to proxy /api/v1/authn request
//
var oktaServer = proxy({
  context: ['/api', '/oauth2'],
  target: proxyServer,
  changeOrigin: true,
  followRedirects: true,
  onProxyReq(proxyReq, req) {
    console.log(`Proxying request: ${proxyServer}${req.url}`);
  },
  onProxyRes(proxyRes, req, res) {
    console.log(`Proxying get response: requrl (${req.url})`);
    console.log(proxyRes);
    /*
      if (req.url === '/oauth2/v1') {
        // delete id token
      }
    */
    //console.log(JSON.stringify(proxyRes, null, 2));
  },
  onError(err, req, res) {
    console.error('proxy server got error', err);
  }
});

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', oktaServer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
