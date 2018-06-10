'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageSnapshot = exports.renderOnly = exports.shallowSnapshot = exports.snapshotWithOptions = exports.multiSnapshotWithOptions = exports.snapshot = exports.getSnapshotFileName = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = testStorySnapshots;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _global = require('global');

var _global2 = _interopRequireDefault(_global);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _frameworkLoader = require('./frameworkLoader');

var _frameworkLoader2 = _interopRequireDefault(_frameworkLoader);

var _storybookChannelMock = require('./storybook-channel-mock');

var _storybookChannelMock2 = _interopRequireDefault(_storybookChannelMock);

var _getIntegrityOptions = require('./getIntegrityOptions');

var _getIntegrityOptions2 = _interopRequireDefault(_getIntegrityOptions);

var _utils = require('./utils');

var _testBodyImageSnapshot = require('./test-body-image-snapshot');

var _testBodies = require('./test-bodies');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global2.default.STORYBOOK_REACT_CLASSES = _global2.default.STORYBOOK_REACT_CLASSES || {};

exports.getSnapshotFileName = _utils.getSnapshotFileName;
exports.snapshot = _testBodies.snapshot;
exports.multiSnapshotWithOptions = _testBodies.multiSnapshotWithOptions;
exports.snapshotWithOptions = _testBodies.snapshotWithOptions;
exports.shallowSnapshot = _testBodies.shallowSnapshot;
exports.renderOnly = _testBodies.renderOnly;
exports.imageSnapshot = _testBodyImageSnapshot.imageSnapshot;


var methods = ['beforeAll', 'beforeEach', 'afterEach', 'afterAll'];

function testStorySnapshots() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof _global.describe !== 'function') {
    throw new Error('testStorySnapshots is intended only to be used inside jest');
  }

  _addons2.default.setChannel((0, _storybookChannelMock2.default)());

  var _loadFramework = (0, _frameworkLoader2.default)(options),
      storybook = _loadFramework.storybook,
      framework = _loadFramework.framework,
      renderTree = _loadFramework.renderTree,
      renderShallowTree = _loadFramework.renderShallowTree;

  var stories = storybook.getStorybook();

  if (stories.length === 0) {
    throw new Error('storyshots found 0 stories');
  }

  // NOTE: keep `suit` typo for backwards compatibility
  var suite = options.suite || options.suit || 'Storyshots';
  // NOTE: Added not to break existing storyshots configs (can be removed in a future major release)
  var storyNameRegex = options.storyNameRegex || options.storyRegex;

  var snapshotOptions = {
    renderer: options.renderer,
    serializer: options.serializer
  };

  var testMethod = options.test || (0, _testBodies.snapshotWithOptions)(snapshotOptions);
  var integrityOptions = (0, _getIntegrityOptions2.default)(options);

  methods.forEach(function (method) {
    if (typeof testMethod[method] === 'function') {
      _global2.default[method](testMethod[method]);
    }
  });

  // eslint-disable-next-line

  var _loop = function _loop(group) {
    var fileName = group.fileName,
        kind = group.kind;


    if (options.storyKindRegex && !kind.match(options.storyKindRegex)) {
      // eslint-disable-next-line
      return 'continue';
    }

    (0, _global.describe)(suite, function () {
      (0, _global.describe)(kind, function () {
        var _loop2 = function _loop2(story) {
          if (storyNameRegex && !story.name.match(storyNameRegex)) {
            // eslint-disable-next-line
            return 'continue';
          }

          (0, _global.it)(story.name, function () {
            var context = { fileName: fileName, kind: kind, story: story.name, framework: framework };
            return testMethod({
              story: story,
              context: context,
              renderTree: renderTree,
              renderShallowTree: renderShallowTree
            });
          });
        };

        // eslint-disable-next-line
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(group.stories), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var story = _step2.value;

            var _ret2 = _loop2(story);

            if (_ret2 === 'continue') continue;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });
    });
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(stories), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var group = _step.value;

      var _ret = _loop(group);

      if (_ret === 'continue') continue;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (integrityOptions !== false) {
    (0, _global.describe)('Storyshots Integrity', function () {
      test('Abandoned Storyshots', function () {
        var storyshots = _glob2.default.sync('**/*.storyshot', integrityOptions);

        var abandonedStoryshots = storyshots.filter(function (fileName) {
          var possibleStoriesFiles = (0, _utils.getPossibleStoriesFiles)(fileName);
          return !possibleStoriesFiles.some(_fs2.default.existsSync);
        });
        expect(abandonedStoryshots).toHaveLength(0);
      });
    });
  }
}