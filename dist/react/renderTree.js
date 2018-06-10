'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRenderedTree(story, context, _ref) {
  var renderer = _ref.renderer,
      serializer = _ref.serializer,
      rendererOptions = (0, _objectWithoutProperties3.default)(_ref, ['renderer', 'serializer']);

  var storyElement = story.render(context);
  var currentRenderer = renderer || _reactTestRenderer2.default.create;
  var tree = currentRenderer(storyElement, rendererOptions);
  return serializer ? serializer(tree) : tree;
} // eslint-disable-next-line import/no-extraneous-dependencies
exports.default = getRenderedTree;