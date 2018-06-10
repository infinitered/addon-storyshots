'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRenderedTree(story, context, _ref) {
  var renderer = _ref.renderer,
      serializer = _ref.serializer;

  var storyElement = story.render(context);
  var shallowRenderer = renderer || _shallow2.default.createRenderer();
  var tree = shallowRenderer.render(storyElement);
  return serializer ? serializer(tree) : tree;
} // eslint-disable-next-line import/no-extraneous-dependencies
exports.default = getRenderedTree;