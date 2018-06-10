'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _AngularSnapshotSerializer = require('jest-preset-angular/AngularSnapshotSerializer');

var _AngularSnapshotSerializer2 = _interopRequireDefault(_AngularSnapshotSerializer);

var _HTMLCommentSerializer = require('jest-preset-angular/HTMLCommentSerializer');

var _HTMLCommentSerializer2 = _interopRequireDefault(_HTMLCommentSerializer);

var _testing = require('@angular/core/testing');

var _testing2 = require('@angular/platform-browser-dynamic/testing');

var _core = require('@angular/core');

var _jestSpecificSnapshot = require('jest-specific-snapshot');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
(0, _jestSpecificSnapshot.addSerializer)(_HTMLCommentSerializer2.default);
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

(0, _jestSpecificSnapshot.addSerializer)(_AngularSnapshotSerializer2.default);

function getRenderedTree(story, context) {
  var currentStory = story.render(context);

  var _initModuleData = (0, _helpers.initModuleData)(currentStory),
      moduleMeta = _initModuleData.moduleMeta,
      AppComponent = _initModuleData.AppComponent;

  _testing.TestBed.configureTestingModule({
    imports: [].concat((0, _toConsumableArray3.default)(moduleMeta.imports)),
    declarations: [].concat((0, _toConsumableArray3.default)(moduleMeta.declarations)),
    providers: [].concat((0, _toConsumableArray3.default)(moduleMeta.providers)),
    schemas: [_core.NO_ERRORS_SCHEMA].concat((0, _toConsumableArray3.default)(moduleMeta.schemas)),
    bootstrap: [].concat((0, _toConsumableArray3.default)(moduleMeta.bootstrap))
  });

  _testing.TestBed.overrideModule(_testing2.BrowserDynamicTestingModule, {
    set: {
      entryComponents: [].concat((0, _toConsumableArray3.default)(moduleMeta.entryComponents))
    }
  });

  return _testing.TestBed.compileComponents().then(function () {
    var tree = _testing.TestBed.createComponent(AppComponent);
    tree.detectChanges();

    return tree;
  });
}

exports.default = getRenderedTree;