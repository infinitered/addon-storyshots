'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babel = require('babel-core');

function getConfigContent(_ref) {
  var resolvedConfigDirPath = _ref.resolvedConfigDirPath,
      configPath = _ref.configPath,
      babelConfigPath = _ref.babelConfigPath;

  var loadBabelConfig = require.requireActual(babelConfigPath).default;
  var babelConfig = loadBabelConfig(resolvedConfigDirPath);
  return babel.transformFileSync(configPath, babelConfig).code;
}

function load(_ref2) {
  var configDirPath = _ref2.configDirPath,
      babelConfigPath = _ref2.babelConfigPath;

  var resolvedConfigDirPath = _path2.default.resolve(configDirPath || '.storybook');
  var configPath = _path2.default.join(resolvedConfigDirPath, 'config.js');

  var content = getConfigContent({ resolvedConfigDirPath: resolvedConfigDirPath, configPath: configPath, babelConfigPath: babelConfigPath });
  var contextOpts = { filename: configPath, dirname: resolvedConfigDirPath };

  return {
    content: content,
    contextOpts: contextOpts
  };
}

exports.default = load;