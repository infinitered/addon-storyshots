'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageSnapshot = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jestImageSnapshot = require('jest-image-snapshot');

var _nodeLogger = require('@storybook/node-logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

expect.extend({ toMatchImageSnapshot: _jestImageSnapshot.toMatchImageSnapshot });

// We consider taking the full page is a reasonnable default.
var defaultScreenshotOptions = function defaultScreenshotOptions() {
  return { fullPage: true };
};

var noop = function noop() {};

var defaultConfig = {
  storybookUrl: 'http://localhost:6006',
  getMatchOptions: noop,
  getScreenshotOptions: defaultScreenshotOptions,
  beforeScreenshot: noop,
  getGotoOptions: noop
};

var imageSnapshot = exports.imageSnapshot = function imageSnapshot() {
  var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _defaultConfig$custom = (0, _extends3.default)({}, defaultConfig, customConfig),
      storybookUrl = _defaultConfig$custom.storybookUrl,
      getMatchOptions = _defaultConfig$custom.getMatchOptions,
      getScreenshotOptions = _defaultConfig$custom.getScreenshotOptions,
      beforeScreenshot = _defaultConfig$custom.beforeScreenshot,
      getGotoOptions = _defaultConfig$custom.getGotoOptions;

  var browser = void 0; // holds ref to browser. (ie. Chrome)
  var page = void 0; // Hold ref to the page to screenshot.

  var testFn = function testFn(_ref) {
    var context = _ref.context;

    if (context.framework === 'rn') {
      // Skip tests since we de not support RN image snapshots.
      _nodeLogger.logger.error("It seems you are running imageSnapshot on RN app and it's not supported. Skipping test.");
      return _promise2.default.resolve();
    }

    var encodedKind = encodeURIComponent(context.kind);
    var encodedStoryName = encodeURIComponent(context.story);
    var storyUrl = '/iframe.html?selectedKind=' + encodedKind + '&selectedStory=' + encodedStoryName;
    var url = storybookUrl + storyUrl;
    if (!browser || !page) {
      _nodeLogger.logger.error('Error when generating image snapshot for test ' + context.kind + ' - ' + context.story + ' : It seems the headless browser is not running.');
      return _promise2.default.reject(new Error('no-headless-browser-running'));
    }

    expect.assertions(1);
    return page.goto(url, getGotoOptions({ context: context, url: url })).catch(function (e) {
      _nodeLogger.logger.error('ERROR WHILE CONNECTING TO ' + url + ', did you start or build the storybook first ? A storybook instance should be running or a static version should be built when using image snapshot feature.', e);
      throw e;
    }).then(function () {
      return beforeScreenshot(page, { context: context, url: url });
    }).then(function () {
      return page.screenshot(getScreenshotOptions({ context: context, url: url }));
    }).then(function (image) {
      expect(image).toMatchImageSnapshot(getMatchOptions({ context: context, url: url }));
    });
  };

  testFn.beforeAll = function () {};
  testFn.afterAll = function () {
    return browser.close();
  };

  return testFn;
};
