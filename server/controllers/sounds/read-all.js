var _ = require('underscore');
var fs = require('fs');
var Sound = require('../../../models/sound');

module.exports = function (req, res, next) {
  fs.readdir(__dirname + '/../../../public/audio/sounds', function (er, files) {
    if (er) next(er);
    files = _.reject(files, function (file) { return file[0] === '.'; });
    files = _.map(files, function (file) { return {id: file.slice(0, -4)}; });
    res.send(new Sound.Collection(files));
  });
};
