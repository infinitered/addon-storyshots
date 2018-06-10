'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasDependency;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readPkgUp = require('read-pkg-up');

var _readPkgUp2 = _interopRequireDefault(_readPkgUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _readPkgUp$sync = _readPkgUp2.default.sync(),
    pkg = _readPkgUp$sync.pkg;

function hasDependency(name) {
  return pkg.devDependencies && pkg.devDependencies[name] || pkg.dependencies && pkg.dependencies[name] || _fs2.default.existsSync(_path2.default.join('node_modules', name, 'package.json'));
}