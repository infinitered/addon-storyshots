'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _hasDependency = require('../hasDependency');

var _hasDependency2 = _interopRequireDefault(_hasDependency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */
function test(options) {
  return options.framework === 'react-native' || !options.framework && (0, _hasDependency2.default)('@storybook/react-native');
}

function load(options) {
  var storybook = require.requireActual('@storybook/react-native');

  var configPath = _path2.default.resolve(options.configPath || 'storybook');
  require.requireActual(configPath);

  return {
    renderTree: require('../react/renderTree').default,
    renderShallowTree: require('../react/renderShallowTree').default,
    framework: 'rn',
    storybook: storybook
  };
}

exports.default = {
  load: load,
  test: test
};