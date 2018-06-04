'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPossibleStoriesFiles = getPossibleStoriesFiles;
exports.getSnapshotFileName = getSnapshotFileName;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStoryshotFile(fileName) {
  var _path$parse = _path2.default.parse(fileName),
      dir = _path$parse.dir,
      name = _path$parse.name;

  return _path2.default.format({ dir: _path2.default.join(dir, '__snapshots__'), name: name, ext: '.storyshot' });
}

function getPossibleStoriesFiles(storyshotFile) {
  var _path$parse2 = _path2.default.parse(storyshotFile),
      dir = _path$parse2.dir,
      name = _path$parse2.name;

  return [_path2.default.format({ dir: _path2.default.dirname(dir), name: name, ext: '.js' }), _path2.default.format({ dir: _path2.default.dirname(dir), name: name, ext: '.jsx' }), _path2.default.format({ dir: _path2.default.dirname(dir), name: name, ext: '.ts' }), _path2.default.format({ dir: _path2.default.dirname(dir), name: name, ext: '.tsx' })];
}

function getSnapshotFileName(context) {
  var fileName = context.fileName;


  if (!fileName) {
    return null;
  }

  return getStoryshotFile(fileName);
}