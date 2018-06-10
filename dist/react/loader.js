'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _require_context = require('../require_context');

var _require_context2 = _interopRequireDefault(_require_context);

var _hasDependency = require('../hasDependency');

var _hasDependency2 = _interopRequireDefault(_hasDependency);

var _configLoader = require('../config-loader');

var _configLoader2 = _interopRequireDefault(_configLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(options) {
  return options.framework === 'react' || !options.framework && (0, _hasDependency2.default)('@storybook/react');
}

function load(options) {
  var _loadConfig = (0, _configLoader2.default)({
    configDirPath: options.configPath,
    babelConfigPath: '@storybook/react/dist/server/babel_config'
  }),
      content = _loadConfig.content,
      contextOpts = _loadConfig.contextOpts;

  (0, _require_context2.default)(content, contextOpts);

  return {
    framework: 'react',
    renderTree: require.requireActual('./renderTree').default,
    renderShallowTree: require.requireActual('./renderShallowTree').default,
    storybook: require.requireActual('@storybook/react')
  };
}

exports.default = {
  load: load,
  test: test
};