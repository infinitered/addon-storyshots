'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loader = require('./react/loader');

var _loader2 = _interopRequireDefault(_loader);

var _loader3 = require('./rn/loader');

var _loader4 = _interopRequireDefault(_loader3);

var _loader5 = require('./angular/loader');

var _loader6 = _interopRequireDefault(_loader5);

var _loader7 = require('./vue/loader');

var _loader8 = _interopRequireDefault(_loader7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaders = [_loader2.default, _loader6.default, _loader4.default, _loader8.default];

function loadFramework(options) {
  var loader = loaders.find(function (frameworkLoader) {
    return frameworkLoader.test(options);
  });

  if (!loader) {
    throw new Error('storyshots is intended only to be used with storybook');
  }

  return loader.load(options);
}

exports.default = loadFramework;