module.exports = function (files) {
  files.forEach(function (file) { require('./' + file); });
};
