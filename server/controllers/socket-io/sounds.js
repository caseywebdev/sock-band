var _ = require('underscore');
var fs = require('fs');
var Sound = require('../../../models/sound');

module.exports = function (user, data, cb) {
  if (Sound.all.length) return cb(Sound.all);
  fs.readdir(__dirname + '/../../../public/audio/sounds', function (er, files) {
    files = _.reject(files.sort(), function (file) { return file[0] === '.'; });
    files = _.map(files, function (file) { return {id: file.slice(0, -4)}; });
    cb(Sound.all.set(files));
  });
};
