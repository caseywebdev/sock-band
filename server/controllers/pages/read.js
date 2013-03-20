var fs = require('fs');

var abs = function (view) { return __dirname + '/../../../views/' + view; };

module.exports = function (req, res, next) {
  var ext = '.' + req.app.get('view engine');
  if (req.path.match(/\/_/)) return next();
  var view = 'pages' + req.path + ext;
  fs.stat(abs(view), function (er) {
    if (!er) return res.render(view);
    view = 'pages' + req.path + '/_index' + ext;
    fs.stat(abs(view), function (er) {
      if (er) return next();
      res.render(view);
    });
  });
};
