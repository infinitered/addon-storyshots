'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = getIntegrityOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignore = ['**/node_modules/**'];

function getIntegrityOptions(options) {
  var integrityOptions = options.integrityOptions;


  if (integrityOptions === false) {
    return false;
  }

  if ((typeof integrityOptions === 'undefined' ? 'undefined' : (0, _typeof3.default)(integrityOptions)) !== 'object') {
    return false;
  }

  return (0, _extends3.default)({}, integrityOptions, {
    ignore: [].concat(ignore, (0, _toConsumableArray3.default)(integrityOptions.ignore || [])),
    absolute: true
  });
}