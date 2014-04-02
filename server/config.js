var _ = require('underscore');

var env = process.env.NODE_ENV || 'development';

var config = module.exports = {
  env: env,
  buffer: 250,
  pollInterval: 5000
};

_.extend(config,
  env === 'production' ? {
    serverUrl: 'http://sockband.jit.su',
    serverPort: process.env.PORT || 80
  } : env === 'development' ? {
    serverUrl: 'http://localhost:3333',
    serverPort: 3333
  } : {
    serverUrl: 'http://localhost:7359',
    serverPort: 7359
  }
);
