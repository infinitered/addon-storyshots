'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = require('global');

var _global2 = _interopRequireDefault(_global);

var _require_context = require('../require_context');

var _require_context2 = _interopRequireDefault(_require_context);

var _hasDependency = require('../hasDependency');

var _hasDependency2 = _interopRequireDefault(_hasDependency);

var _configLoader = require('../config-loader');

var _configLoader2 = _interopRequireDefault(_configLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mockVueToIncludeCompiler() {
  jest.mock('vue', function () {
    return require.requireActual('vue/dist/vue.common.js');
  });
}

function test(options) {
  return options.framework === 'vue' || !options.framework && (0, _hasDependency2.default)('@storybook/vue');
}

function load(options) {
  _global2.default.STORYBOOK_ENV = 'vue';
  mockVueToIncludeCompiler();

  var _loadConfig = (0, _configLoader2.default)({
    configDirPath: options.configPath,
    babelConfigPath: '@storybook/vue/dist/server/babel_config'
  }),
      content = _loadConfig.content,
      contextOpts = _loadConfig.contextOpts;

  (0, _require_context2.default)(content, contextOpts);

  return {
    framework: 'vue',
    renderTree: require.requireActual('./renderTree').default,
    renderShallowTree: function renderShallowTree() {
      throw new Error('Shallow renderer is not supported for vue');
    },
    storybook: require.requireActual('@storybook/vue')
  };
}

exports.default = {
  load: load,
  test: test
};