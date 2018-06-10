'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snapshot = exports.multiSnapshotWithOptions = exports.snapshotWithOptions = undefined;
exports.shallowSnapshot = shallowSnapshot;
exports.renderOnly = renderOnly;

require('jest-specific-snapshot');

var _utils = require('./utils');

var snapshotWithOptions = exports.snapshotWithOptions = function snapshotWithOptions(options) {
  return function (_ref) {
    var story = _ref.story,
        context = _ref.context,
        renderTree = _ref.renderTree,
        snapshotFileName = _ref.snapshotFileName;

    var result = renderTree(story, context, options);

    function match(tree) {
      if (snapshotFileName) {
        expect(tree).toMatchSpecificSnapshot(snapshotFileName);
      } else {
        expect(tree).toMatchSnapshot();
      }

      if (typeof tree.unmount === 'function') {
        tree.unmount();
      }
    }

    if (typeof result.then === 'function') {
      return result.then(match);
    }

    return match(result);
  };
};

var multiSnapshotWithOptions = exports.multiSnapshotWithOptions = function multiSnapshotWithOptions(options) {
  return function (_ref2) {
    var story = _ref2.story,
        context = _ref2.context,
        renderTree = _ref2.renderTree;
    return snapshotWithOptions(options)({
      story: story,
      context: context,
      renderTree: renderTree,
      snapshotFileName: (0, _utils.getSnapshotFileName)(context)
    });
  };
};

function shallowSnapshot(_ref3) {
  var story = _ref3.story,
      context = _ref3.context,
      renderShallowTree = _ref3.renderShallowTree,
      _ref3$options = _ref3.options,
      options = _ref3$options === undefined ? {} : _ref3$options;

  var result = renderShallowTree(story, context, options);
  expect(result).toMatchSnapshot();
}

function renderOnly(_ref4) {
  var story = _ref4.story,
      context = _ref4.context,
      renderTree = _ref4.renderTree;

  var result = renderTree(story, context, {});

  if (typeof result.then === 'function') {
    return result;
  }

  return undefined;
}

var snapshot = exports.snapshot = snapshotWithOptions({});