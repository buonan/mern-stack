var fs = require('fs');
var path = require('path');

module.exports = function (app) {
  walk(__dirname, app, function (err, results) {
    if (err) throw err;
  });
}

function oldSync(app) {
  fs.readdirSync(__dirname).forEach(function (file) {
    if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
      return;
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app);
  });
}

var walk = function (dir, app, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, app, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          var f  = path.parse(file).base;
          if (f === "index.js") {
            var name = file.substr(0, file.indexOf('.'));
            require(name)(app);
          }
          next();
        }
      });
    })();
  });
}