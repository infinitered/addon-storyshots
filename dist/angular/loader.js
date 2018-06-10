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

function setupAngularJestPreset() {
  // Angular + Jest + Storyshots = Crazy Shit:
  // We need to require 'jest-preset-angular/setupJest' before any storybook code
  // is running inside jest -  one of the things that `jest-preset-angular/setupJest` does is
  // extending the `window.Reflect` with all the needed metadata functions, that are required
  // for emission of the TS decorations like 'design:paramtypes'
  require.requireActual('jest-preset-angular/setupJest');
}

function test(options) {
  return options.framework === 'angular' || !options.framework && (0, _hasDependency2.default)('@storybook/angular');
}

function load(options) {
  setupAngularJestPreset();

  var _loadConfig = (0, _configLoader2.default)({
    configDirPath: options.configPath,
    babelConfigPath: '@storybook/angular/dist/server/babel_config'
  }),
      content = _loadConfig.content,
      contextOpts = _loadConfig.contextOpts;

  (0, _require_context2.default)(content, contextOpts);

  return {
    framework: 'angular',
    renderTree: require.requireActual('./renderTree').default,
    renderShallowTree: function renderShallowTree() {
      throw new Error('Shallow renderer is not supported for angular');
    },
    storybook: require.requireActual('@storybook/angular')
  };
}

exports.default = {
  load: load,
  test: test
};