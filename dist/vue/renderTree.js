'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRenderedTree(story, context) {
  var storyElement = story.render(context);

  var Constructor = _vue2.default.extend(storyElement);
  var vm = new Constructor().$mount();

  return vm.$el;
} // eslint-disable-next-line import/no-extraneous-dependencies
exports.default = getRenderedTree;