var _ = require('underscore');
var config = require('../config');
var express = require('express');
var fs = require('fs');
var os = require('os');

var app = express();

// Bind to port.
app.listen(config.serverPort);

// All lower case and no trailing slashes allowed.
app.enable('case sensitive routing');
app.enable('strict routing');

// Set view engine up.
app.set('view engine', 'tmpl');
require('underscore-express')(app);

// ## Vendor Middleware
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express['static'](__dirname + '/../../public'));

// ## Custom Middleware
app.use(function (req, res, next) {

  // Thanks to super awesome iOS caching, we must ensure any dynamic responses
  // (anything beyond this point in the middleware) aren't cached.
  res.set('Cache-Control', 'no-cache');

  // Set helpful locals for templates.
  res.locals._ = _;
  res.locals.config = config;
  res.locals.req = req;
  res.locals.variable = 'o';
  try {
    res.locals.ip = os.networkInterfaces().en0[1].address;
  } catch (er) { console.error(er); }
  next();
});

// Hook routes and controllers
var controllers = fs.readdirSync(__dirname + '/../controllers');
for (var i = 0, l = controllers.length; i < l; ++i) {
  if (controllers[i][0] === '.') continue;
  require('../controllers/' + controllers[i])(app);
}

// 404 catch-all fallback
app.all('*', function (req, res, next) { next(404); });

// Error handler
app.use(function (er, req, res, next) {
  if (!er.status || !er.message) {
    console.error(er.stack || er);
    er.status = 500;
    er.message = 'Internal Server Error';
  }
  var status = er.status;
  var message = er.message;
  var accept = req.accepts(['json', 'html']);
  if (!accept) return res.send(status);
  if (accept !== 'html') return res.send(status, {error: message});
  res.render('pages/_error', {
    status: status,
    message: message
  }, function (er, html) {
    if (er) return next(er);
    res.send(status, html);
  });
});
