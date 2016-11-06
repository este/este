/* eslint-disable */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eventPreventDefault(event) {
  setTimeout(() => event.preventDefault(), 1);
}

function isTouch() {
  return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

function hasTwoTouchPoints(event) {
  if (isTouch()) {
    return event.touches && event.touches.length === 2;
  } else {
    return event.altKey;
  }
}

function between(min, max, val) {
  return Math.min(max, Math.max(min, val));
}

function inverse(val) {
  return val * -1;
}

function normalizeTouch(e) {
  var p = isTouch() ? e.touches[0] : e;
  return {
    x: p.clientX,
    y: p.clientY
  };
}

var ReactPinchZoomPan = function (_Component) {
  (0, _inherits3.default)(ReactPinchZoomPan, _Component);

  function ReactPinchZoomPan(props) {
    (0, _classCallCheck3.default)(this, ReactPinchZoomPan);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReactPinchZoomPan).call(this, props));

    _this.state = { obj: {
        scale: 1,
        x: 0,
        y: 0
      } };
    return _this;
  }

  (0, _createClass3.default)(ReactPinchZoomPan, [{
    key: 'resize',
    value: function resize() {
      if (this.refs.root) {
        var domNode = this.refs.root;
        this.setState({
          size: {
            width: domNode.offsetWidth,
            height: domNode.offsetHeight
          }
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.pinchSubscription) {
        this.pinchSubscription.dispose();
      }
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.handlePinch();
      this.resize();
      window.addEventListener('resize', (0, _lodash2.default)(function () {
        return _this2.resize();
      }, 500));
    }
  }, {
    key: 'handlePinch',
    value: function handlePinch() {
      var _this3 = this;

      var domNode = this.refs.root;
      var touchStart = _rx2.default.Observable.fromEvent(domNode, isTouch() ? 'touchstart' : 'mousedown');
      var touchMove = _rx2.default.Observable.fromEvent(window, isTouch() ? 'touchmove' : 'mousemove');
      var touchEnd = _rx2.default.Observable.fromEvent(window, isTouch() ? 'touchend' : 'mouseup');

      function translatePos(point, size) {
        return {
          x: point.x - size.width / 2,
          y: point.y - size.height / 2
        };
      }

      var pinch = touchStart.tap(eventPreventDefault).flatMap(function (md) {
        var startPoint = normalizeTouch(md);
        var size = _this3.state.size;


        return touchMove.map(function (mm) {
          var _state$obj = _this3.state.obj;
          var scale = _state$obj.scale;
          var x = _state$obj.x;
          var y = _state$obj.y;
          var maxScale = _this3.props.maxScale;

          var movePoint = normalizeTouch(mm);

          if (hasTwoTouchPoints(mm)) {
            var scaleFactor = void 0;
            if (isTouch()) {
              scaleFactor = mm.scale;
            } else {
              scaleFactor = movePoint.x < size.width / 2 ? scale + (translatePos(startPoint, size).x - translatePos(movePoint, size).x) / size.width : scale + (translatePos(movePoint, size).x - translatePos(startPoint, size).x) / size.width;
            }
            scaleFactor = between(1, maxScale, scaleFactor);
            return {
              scale: scaleFactor,
              x: scaleFactor < 1.01 ? 0 : x,
              y: scaleFactor < 1.01 ? 0 : y
            };
          } else {
            var scaleFactorX = (size.width * scale - size.width) / (maxScale * 2);
            var scaleFactorY = (size.height * scale - size.height) / (maxScale * 2);
            return {
              x: between(inverse(scaleFactorX), scaleFactorX, movePoint.x - startPoint.x),
              y: between(inverse(scaleFactorY), scaleFactorY, movePoint.y - startPoint.y)
            };
          }
        }).takeUntil(touchEnd);
      });

      this.pinchSubscription = pinch.subscribe(function (newObject) {
        global.requestAnimationFrame(function () {
          _this3.setState({
            obj: (0, _assign2.default)({}, _this3.state.obj, newObject)
          });
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$obj2 = this.state.obj;
      var scale = _state$obj2.scale;
      var x = _state$obj2.x;
      var y = _state$obj2.y;

      return _react2.default.createElement(
        'div',
        { ref: 'root' },
        this.props.render({
          x: x.toFixed(2),
          y: y.toFixed(2),
          scale: scale.toFixed(2)
        })
      );
    }
  }]);
  return ReactPinchZoomPan;
}(_react.Component);

ReactPinchZoomPan.defaultProps = {
  maxScale: 2
};

ReactPinchZoomPan.propTypes = {
  render: _react.PropTypes.func,
  maxScale: _react.PropTypes.number
};

exports.default = ReactPinchZoomPan;
